import { useMemo } from 'react';
import Head from 'next/head';
import { COLOR_PALETTE_DARK, COLOR_PALETTE_LIGHT, FINAL_TEXT, TIMING } from '../src/constants';
import { useTypingEffect, useBlinkingCursor } from '../src/hooks';
import { ColoredLetter, Cursor } from '../src/components/Intro';
import { CVOverlay } from '../src/components/CV';
import s from '../src/components/Intro/Intro.module.scss';

export default function Home() {
  const { displayedText, isSelected, showCV, theme, setTheme } = useTypingEffect(TIMING.INITIAL_DELAY);
  const cursorVisible = useBlinkingCursor(TIMING.CURSOR_BLINK);

  const currentPalette = theme === 'dark' ? COLOR_PALETTE_DARK : COLOR_PALETTE_LIGHT;
  const colors = useMemo(() =>
    Array.from({ length: FINAL_TEXT.length }, (_, i) => currentPalette[i % currentPalette.length]),
    [currentPalette]
  );

  return (
    <>
      <Head>
        <title>Ludwig Lillieborg</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Ludwig Lillieborg" />
        <meta property="og:title" content="Ludwig Lillieborg" />
        <meta property="og:description" content="Ludwig Lillieborgs website" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ludwig.lillieb.org" />
        <link rel="canonical" href="https://ludwig.lillieb.org" />
      </Head>

      <div className={s.intro}>
        <h1 className={s.intro__title} aria-live="polite" aria-label="Terminal typing animation">
          <span className={s.intro__prompt} aria-hidden="true">$</span>
          {displayedText.split('').map((char, i) => (
            <ColoredLetter
              key={i}
              char={char}
              color={colors[i % colors.length]}
              isSelected={isSelected}
            />
          ))}
          <Cursor visible={cursorVisible && !isSelected} />
        </h1>
      </div>

      <CVOverlay visible={showCV} colors={currentPalette} theme={theme} setTheme={setTheme} />
    </>
  );
}
