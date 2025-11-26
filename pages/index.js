import { useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import s from '../src/components/App/App.module.scss';

const COLOR_PALETTE = ['#db5d81', '#7aa0bd', '#eca854', '#bc0d12', '#009ba0'];
const FINAL_TEXT = 'ludwig lillieborg';
const FINAL_TITLE = 'full-stack developer';
const MISTAKE_TEXT = 'ludvig li';
const BACKSPACE_TO_LENGTH = 3;
const INITIAL_DELAY_MS = 2000;
const CURSOR_BLINK_MS = 530;
const TYPING_DELAY_MIN_MS = 50;
const TYPING_DELAY_MAX_MS = 350;
const BACKSPACE_DELAY_MS = 100;
const PAUSE_BEFORE_CORRECTION_MS = 500;
const PAUSE_AFTER_NAME_MS = 2000;
const PAUSE_AFTER_SELECT_MS = 1200;
const PAUSE_BEFORE_TITLE_MS = 250;

function generateUniqueColors(count, palette) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    let color;
    do {
      color = palette[Math.floor(Math.random() * palette.length)];
    } while (color === colors[i - 1]);
    colors.push(color);
  }
  return colors;
}

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function useTypingEffect(startDelay) {
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState('initial');
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setPhase('typing-mistake'), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    let timeout;

    if (phase === 'typing-mistake' && displayedText.length < MISTAKE_TEXT.length) {
      timeout = setTimeout(() => {
        setDisplayedText(MISTAKE_TEXT.slice(0, displayedText.length + 1));
      }, getRandomDelay(TYPING_DELAY_MIN_MS, TYPING_DELAY_MAX_MS));
    } else if (phase === 'typing-mistake' && displayedText === MISTAKE_TEXT) {
      timeout = setTimeout(() => {
        setPhase('backspacing');
      }, PAUSE_BEFORE_CORRECTION_MS);
    } else if (phase === 'backspacing' && displayedText.length > BACKSPACE_TO_LENGTH) {
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, BACKSPACE_DELAY_MS);
    } else if (phase === 'backspacing' && displayedText.length === BACKSPACE_TO_LENGTH) {
      setPhase('typing-correct');
    } else if (phase === 'typing-correct' && displayedText.length < FINAL_TEXT.length) {
      timeout = setTimeout(() => {
        setDisplayedText(FINAL_TEXT.slice(0, displayedText.length + 1));
      }, getRandomDelay(TYPING_DELAY_MIN_MS, TYPING_DELAY_MAX_MS));
    } else if (phase === 'typing-correct' && displayedText === FINAL_TEXT) {
      timeout = setTimeout(() => {
        setPhase('selecting');
        setIsSelected(true);
      }, PAUSE_AFTER_NAME_MS);
    } else if (phase === 'selecting') {
      timeout = setTimeout(() => {
        setPhase('pre-typing-title');
        setDisplayedText('');
        setIsSelected(false);
      }, PAUSE_AFTER_SELECT_MS);
    } else if (phase === 'pre-typing-title') {
      timeout = setTimeout(() => {
        setPhase('typing-title');
      }, PAUSE_BEFORE_TITLE_MS);
    } else if (phase === 'typing-title' && displayedText.length < FINAL_TITLE.length) {
      timeout = setTimeout(() => {
        setDisplayedText(FINAL_TITLE.slice(0, displayedText.length + 1));
      }, getRandomDelay(TYPING_DELAY_MIN_MS, TYPING_DELAY_MAX_MS));
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase]);

  return { displayedText, isSelected };
}

function useBlinkingCursor(intervalMs) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setVisible((prev) => !prev), intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return visible;
}

function ColoredLetter({ char, color, isSelected }) {
  return (
    <span style={{
      color: isSelected ? '#ffffff' : color,
      backgroundColor: isSelected ? '#0066cc' : 'transparent'
    }}>
      {char}
    </span>
  );
}

function Cursor({ visible }) {
  return (
    <span className={s.app__cursor} style={{ opacity: visible ? 1 : 0 }}>
      |
    </span>
  );
}

export default function Home() {
  const colors = useMemo(
    () => generateUniqueColors(Math.max(FINAL_TEXT.length, FINAL_TITLE.length), COLOR_PALETTE),
    []
  );
  const { displayedText, isSelected } = useTypingEffect(INITIAL_DELAY_MS);
  const cursorVisible = useBlinkingCursor(CURSOR_BLINK_MS);

  return (
    <>
      <Head>
        <title>ludwig lillieborg</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ludwig.lillieb.org" />
      </Head>
      <div className={s.app}>
        <h1 className={s.app__title}>
          <span className={s.app__prompt}>$</span>
          {displayedText.split('').map((char, i) => (
            <ColoredLetter key={i} char={char} color={colors[i]} isSelected={isSelected} />
          ))}
          <Cursor visible={cursorVisible && !isSelected} />
        </h1>
      </div>
    </>
  );
}
