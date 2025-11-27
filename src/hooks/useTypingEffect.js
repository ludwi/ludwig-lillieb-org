import { useState, useEffect } from 'react';
import { DEBUG_MODE, FINAL_TEXT, MISTAKE_TEXT, BACKSPACE_TO_LENGTH, TIMING } from '../constants';
import { getRandomDelay } from '../utils';

export function useTypingEffect(startDelay) {
  const [displayedText, setDisplayedText] = useState(DEBUG_MODE ? FINAL_TEXT : '');
  const [phase, setPhase] = useState(DEBUG_MODE ? 'complete' : 'initial');
  const [isSelected, setIsSelected] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (DEBUG_MODE) {
      const timeout = setTimeout(() => setShowCV(true), 500);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    const styles = showCV
      ? { overflow: 'hidden', position: 'fixed', width: '100%', height: '100%' }
      : { overflow: '', position: '', width: '', height: '' };

    Object.assign(document.body.style, styles);
    return () => Object.assign(document.body.style, { overflow: '', position: '', width: '', height: '' });
  }, [showCV]);

  useEffect(() => {
    document.documentElement.classList.remove('dark-mode', 'light-mode');
    void document.documentElement.offsetHeight;

    const timeout = setTimeout(() => {
      document.documentElement.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');
    }, 10);

    return () => clearTimeout(timeout);
  }, [theme]);

  useEffect(() => {
    if (DEBUG_MODE) return;
    const timeout = setTimeout(() => setPhase('typing-mistake'), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    let timeout;

    if (phase === 'typing-mistake' && displayedText.length < MISTAKE_TEXT.length) {
      timeout = setTimeout(() => {
        setDisplayedText(MISTAKE_TEXT.slice(0, displayedText.length + 1));
      }, getRandomDelay(TIMING.TYPING_MIN, TIMING.TYPING_MAX));
    } else if (phase === 'typing-mistake' && displayedText === MISTAKE_TEXT) {
      timeout = setTimeout(() => setPhase('backspacing'), TIMING.PAUSE_BEFORE_CORRECTION);
    } else if (phase === 'backspacing' && displayedText.length > BACKSPACE_TO_LENGTH) {
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, TIMING.BACKSPACE);
    } else if (phase === 'backspacing' && displayedText.length === BACKSPACE_TO_LENGTH) {
      setPhase('typing-correct');
    } else if (phase === 'typing-correct' && displayedText.length < FINAL_TEXT.length) {
      timeout = setTimeout(() => {
        setDisplayedText(FINAL_TEXT.slice(0, displayedText.length + 1));
      }, getRandomDelay(TIMING.TYPING_MIN, TIMING.TYPING_MAX));
    } else if (phase === 'typing-correct' && displayedText === FINAL_TEXT) {
      timeout = setTimeout(() => {
        setPhase('selecting');
        setIsSelected(true);
      }, TIMING.PAUSE_AFTER_NAME);
    } else if (phase === 'selecting') {
      timeout = setTimeout(() => {
        setPhase('deleting');
        setDisplayedText('');
        setIsSelected(false);
      }, TIMING.PAUSE_BEFORE_DELETE);
    } else if (phase === 'deleting') {
      timeout = setTimeout(() => setShowCV(true), TIMING.PAUSE_AFTER_DELETE);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase]);

  return { displayedText, isSelected, showCV, theme, setTheme };
}
