import { useMemo, useState, useEffect } from 'react';
import s from '../src/components/App/App.module.scss';

const COLOR_PALETTE = ['#db5d81', '#7aa0bd', '#eca854', '#bc0d12', '#009ba0'];
const TEXT = 'ludwig lillieborg';
const INITIAL_DELAY_MS = 2000;
const CURSOR_BLINK_MS = 530;
const TYPING_DELAY_MIN_MS = 50;
const TYPING_DELAY_MAX_MS = 350;

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

function useTypingEffect(text, startDelay) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (started && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, getRandomDelay(TYPING_DELAY_MIN_MS, TYPING_DELAY_MAX_MS));
      return () => clearTimeout(timeout);
    }
  }, [displayedText, started, text]);

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
    () => generateUniqueColors(TEXT.length, COLOR_PALETTE),
    []
  );
  const displayedText = useTypingEffect(TEXT, INITIAL_DELAY_MS);
  const cursorVisible = useBlinkingCursor(CURSOR_BLINK_MS);

  return (
    <div className={s.app}>
      <h1 className={s.app__title}>
        {displayedText.split('').map((char, i) => (
          <ColoredLetter key={i} char={char} color={colors[i]} />
        ))}
        <Cursor visible={cursorVisible} />
      </h1>
    </div>
  );
}
