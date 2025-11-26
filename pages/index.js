import { useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import s from '../src/components/App/App.module.scss';

const COLOR_PALETTE_DARK = ['#ff6038', '#ffda45', '#f5a700', '#e84011', '#40e0d0'];
const COLOR_PALETTE_LIGHT = ['#ff6038', '#a066bb', '#f5a700', '#e84011', '#40e0d0'];
const FINAL_TEXT = 'ludwig lillieborg';
const MISTAKE_TEXT = 'ludvi ';
const BACKSPACE_TO_LENGTH = 3;
const INITIAL_DELAY_MS = 2000;
const CURSOR_BLINK_MS = 530;
const TYPING_DELAY_MIN_MS = 100;
const TYPING_DELAY_MAX_MS = 250;
const BACKSPACE_DELAY_MS = 250;
const PAUSE_BEFORE_CORRECTION_MS = 0;
const PAUSE_AFTER_NAME_MS = 1000;
const PAUSE_BEFORE_DELETE_MS = 500;
const PAUSE_AFTER_DELETE_MS = 1500;
const DEBUG_MODE = false;

const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function useTypingEffect(startDelay) {
  const [displayedText, setDisplayedText] = useState(DEBUG_MODE ? FINAL_TEXT : '');
  const [phase, setPhase] = useState(DEBUG_MODE ? 'complete' : 'initial');
  const [isSelected, setIsSelected] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [colorShift, setColorShift] = useState(0);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (DEBUG_MODE) {
      const timeout = setTimeout(() => {
        setShowCV(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    const styles = showCV
      ? { overflow: 'hidden', position: 'fixed', width: '100%', height: '100%' }
      : { overflow: '', position: '', width: '', height: '' };

    Object.assign(document.body.style, styles);

    return () => {
      Object.assign(document.body.style, { overflow: '', position: '', width: '', height: '' });
    };
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
        setPhase('color-shifting');
      }, PAUSE_AFTER_NAME_MS);
    } else if (phase === 'color-shifting' && colorShift < 5) {
      timeout = setTimeout(() => {
        setColorShift(colorShift + 1);
      }, 250);
    } else if (phase === 'color-shifting' && colorShift === 5) {
      timeout = setTimeout(() => {
        setPhase('selecting');
        setIsSelected(true);
      }, 1000);
    } else if (phase === 'selecting') {
      timeout = setTimeout(() => {
        setPhase('deleting');
        setDisplayedText('');
        setIsSelected(false);
      }, PAUSE_BEFORE_DELETE_MS);
    } else if (phase === 'deleting') {
      timeout = setTimeout(() => {
        setShowCV(true);
      }, PAUSE_AFTER_DELETE_MS);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase, colorShift]);

  return { displayedText, isSelected, showCV, colorShift, theme, setTheme };
}

function useBlinkingCursor(intervalMs) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setVisible((prev) => !prev), intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return visible;
}

const ColoredLetter = ({ char, color, isSelected }) => (
  <span style={{
    color: isSelected ? '#ffffff' : color,
    backgroundColor: isSelected ? '#0066cc' : 'transparent'
  }}>
    {char}
  </span>
);

const Cursor = ({ visible }) => (
  <span className={s.app__cursor} style={{ opacity: visible ? 1 : 0 }}>|</span>
);

const content = {
  role: 'Lorem Ipsum',
  email: 'lorem@ipsum.com',
  location: 'Lorem, Ipsum',
  about: 'Om',
  aboutText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  experience: 'Erfarenhet',
  skills: 'Kompetenser',
  skillsList: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit'],
  personal: 'Privat',
  personalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
  experiences: [
    {
      title: 'Lorem Ipsum Dolor',
      company: 'Sit Amet Consectetur',
      period: 'XXXX - Lorem',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Adipiscing Elit Sed',
      company: 'Do Eiusmod Tempor',
      period: 'XXXX - XXXX',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ]
};

const animationVariants = {
  controls: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.5, duration: 0.4 }
  },
  sidebar: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.3, duration: 0.4 }
  },
  sidebarItem: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 }
  },
  section: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 }
  },
  experienceItem: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 }
  },
  skillItem: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 }
  }
};

function CVOverlay({ visible, colors, theme, setTheme }) {
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={s.cv}
          initial={{ clipPath: 'circle(0% at 0% 100%)' }}
          animate={{ clipPath: 'circle(150% at 0% 100%)' }}
          exit={{ clipPath: 'circle(0% at 0% 100%)' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 1.2 }}
          role="main"
          aria-label="Curriculum Vitae"
        >
          <motion.div className={s.cv__controls} {...animationVariants.controls}>
            <button
              onClick={toggleTheme}
              className={s.cv__toggle}
              aria-label={`Switch to ${oppositeTheme} mode`}
            >
              {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </motion.div>

          <motion.aside className={s.cv__sidebar} aria-label="Personal information" {...animationVariants.sidebar}>
            <motion.div className={s.cv__profile} {...animationVariants.sidebarItem} transition={{ delay: 0.5, duration: 0.5 }}>
              <div className={s.cv__imageContainer}>
                <div className={s.cv__image} role="img" aria-label="Profile photo placeholder" />
              </div>
              <h2 className={s.cv__name}>
                {'Ludwig Lillieborg'.split('').map((char, i) => (
                  <span key={i} style={{ color: colors[i % colors.length] }}>{char}</span>
                ))}
              </h2>
              <p className={s.cv__role}>{content.role}</p>
            </motion.div>

            <motion.address className={s.cv__contact} {...animationVariants.sidebarItem} transition={{ delay: 0.65, duration: 0.5 }}>
              <p>{content.email}</p>
              <p>{content.location}</p>
            </motion.address>
          </motion.aside>

          <div className={s.cv__main}>
            <motion.section className={s.cv__section} aria-labelledby="about-heading" {...animationVariants.section} transition={{ delay: 0.6, duration: 0.5 }}>
              <h3 id="about-heading" className={s.cv__sectionTitle} style={{ color: colors[1] }}>{content.about}</h3>
              <p className={s.cv__text}>{content.aboutText}</p>
            </motion.section>

            <motion.section className={s.cv__section} aria-labelledby="experience-heading" {...animationVariants.section} transition={{ delay: 0.7, duration: 0.5 }}>
              <h3 id="experience-heading" className={s.cv__sectionTitle} style={{ color: colors[1] }}>{content.experience}</h3>
              <div className={s.cv__timeline} role="list" aria-label="Work experience timeline">
                {content.experiences.map((exp, i) => (
                  <motion.div key={i} className={s.cv__experience} role="listitem" {...animationVariants.experienceItem} transition={{ delay: 0.85 + i * 0.15, duration: 0.4 }}>
                    <div className={s.cv__timelineDot} style={{ backgroundColor: colors[2] }} aria-hidden="true" />
                    <div className={s.cv__timelineContent}>
                      <div className={s.cv__itemHeader}>
                        <h4 className={s.cv__itemTitle}>{exp.title}</h4>
                        <span className={s.cv__itemDate}>{exp.period}</span>
                      </div>
                      <p className={s.cv__itemCompany} style={{ color: colors[1] }}>{exp.company}</p>
                      <p className={s.cv__text}>{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section className={s.cv__section} aria-labelledby="skills-heading" {...animationVariants.section} transition={{ delay: 0.8, duration: 0.5 }}>
              <h3 id="skills-heading" className={s.cv__sectionTitle} style={{ color: colors[1] }}>{content.skills}</h3>
              <ul className={s.cv__skillsGrid} role="list" aria-label="Technical skills">
                {content.skillsList.map((skill, i) => (
                  <motion.li key={skill} className={s.cv__skillItem} style={{ borderLeftColor: colors[1], backgroundColor: colors[1] + '15' }} {...animationVariants.skillItem} transition={{ delay: 1.0 + i * 0.08, duration: 0.3 }}>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            <motion.section className={s.cv__section} aria-labelledby="personal-heading" {...animationVariants.section} transition={{ delay: 0.9, duration: 0.5 }}>
              <h3 id="personal-heading" className={s.cv__sectionTitle} style={{ color: colors[1] }}>{content.personal}</h3>
              <p className={s.cv__text}>{content.personalText}</p>
            </motion.section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const { displayedText, isSelected, showCV, colorShift, theme, setTheme } = useTypingEffect(INITIAL_DELAY_MS);
  const cursorVisible = useBlinkingCursor(CURSOR_BLINK_MS);

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

      <div className={s.app}>
        <h1 className={s.app__title} aria-live="polite" aria-label="Terminal typing animation">
          <span className={s.app__prompt} aria-hidden="true">$</span>
          {displayedText.split('').map((char, i) => (
            <ColoredLetter
              key={i}
              char={char}
              color={colors[(i - colorShift + colors.length) % colors.length]}
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
