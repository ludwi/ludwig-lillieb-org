import { useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import s from '../src/components/App/App.module.scss';

const COLOR_PALETTE = ['#db5d81', '#7aa0bd', '#eca854', '#bc0d12', '#009ba0'];
const FINAL_TEXT = 'ludwig lillieborg';
const INITIAL_DELAY_MS = 2000;
const CURSOR_BLINK_MS = 530;
const TYPING_DELAY_MIN_MS = 50;
const TYPING_DELAY_MAX_MS = 350;
const BACKSPACE_DELAY_MS = 100;
const PAUSE_BEFORE_CORRECTION_MS = 500;

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

  useEffect(() => {
    const timeout = setTimeout(() => setPhase('typing-mistake'), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    let timeout;

    if (phase === 'typing-mistake' && displayedText.length < 9) {
      // Type "ludvig li" (9 characters)
      timeout = setTimeout(() => {
        setDisplayedText('ludvig li'.slice(0, displayedText.length + 1));
      }, getRandomDelay(TYPING_DELAY_MIN_MS, TYPING_DELAY_MAX_MS));
    } else if (phase === 'typing-mistake' && displayedText === 'ludvig li') {
      // Pause before correction
      timeout = setTimeout(() => {
        setPhase('backspacing');
      }, PAUSE_BEFORE_CORRECTION_MS);
    } else if (phase === 'backspacing' && displayedText.length > 3) {
      // Backspace to "lud"
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, BACKSPACE_DELAY_MS);
    } else if (phase === 'backspacing' && displayedText.length === 3) {
      // Start typing correct version
      setPhase('typing-correct');
    } else if (phase === 'typing-correct' && displayedText.length < FINAL_TEXT.length) {
      // Type the rest: "wig lillieborg"
      timeout = setTimeout(() => {
        setDisplayedText(FINAL_TEXT.slice(0, displayedText.length + 1));
      }, getRandomDelay(TYPING_DELAY_MIN_MS, TYPING_DELAY_MAX_MS));
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase]);

  return displayedText;
}

function useBlinkingCursor(intervalMs) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setVisible((prev) => !prev), intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return visible;
}

function ColoredLetter({ char, color }) {
  return <span style={{ color }}>{char}</span>;
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
    () => generateUniqueColors(FINAL_TEXT.length, COLOR_PALETTE),
    []
  );
  const displayedText = useTypingEffect(INITIAL_DELAY_MS);
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
          {displayedText.split('').map((char, i) => (
            <ColoredLetter key={i} char={char} color={colors[i]} />
          ))}
          <Cursor visible={cursorVisible} />
        </h1>
      </div>
    </>
  );
}
