import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { MdLightMode, MdDarkMode, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import s from '../src/components/App/App.module.scss';

const COLOR_PALETTE_DARK = ['#ff6038', '#ffda45', '#f5a700', '#e84011', '#40e0d0'];
const COLOR_PALETTE_LIGHT = ['#ff6038', '#a066bb', '#f5a700', '#e84011', '#40e0d0'];
const FINAL_TEXT = 'ludwig lillieborg';
const MISTAKE_TEXT = 'ludvi ';
const BACKSPACE_TO_LENGTH = 3;
const DEBUG_MODE = true;

const TIMING = {
  INITIAL_DELAY: 2000,
  CURSOR_BLINK: 530,
  TYPING_MIN: 100,
  TYPING_MAX: 250,
  BACKSPACE: 250,
  PAUSE_BEFORE_CORRECTION: 0,
  PAUSE_AFTER_NAME: 1000,
  PAUSE_BEFORE_DELETE: 500,
  PAUSE_AFTER_DELETE: 1500
};

const DESKTOP_BREAKPOINT = 900;
const TOTAL_SECTIONS = 4;

const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getAnimationProps = (isDesktop, variant, customTransition = {}, scrollDirection = 'down') => {
  if (isDesktop) {
    const yOffset = variant.initial?.y || 0;
    const adjustedVariant = {
      ...variant,
      initial: {
        ...variant.initial,
        y: scrollDirection === 'up' ? -Math.abs(yOffset) : Math.abs(yOffset)
      }
    };
    return { ...adjustedVariant, transition: customTransition };
  }
  return { animate: { opacity: 1, y: 0 } };
};

function useTypingEffect(startDelay) {
  const [displayedText, setDisplayedText] = useState(DEBUG_MODE ? FINAL_TEXT : '');
  const [phase, setPhase] = useState(DEBUG_MODE ? 'complete' : 'initial');
  const [isSelected, setIsSelected] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [colorShift, setColorShift] = useState(0);
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
      }, getRandomDelay(TIMING.TYPING_MIN, TYPING.TYPING_MAX));
    } else if (phase === 'typing-correct' && displayedText === FINAL_TEXT) {
      timeout = setTimeout(() => setPhase('color-shifting'), TIMING.PAUSE_AFTER_NAME);
    } else if (phase === 'color-shifting' && colorShift < 5) {
      timeout = setTimeout(() => setColorShift(colorShift + 1), 250);
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
      }, TIMING.PAUSE_BEFORE_DELETE);
    } else if (phase === 'deleting') {
      timeout = setTimeout(() => setShowCV(true), TIMING.PAUSE_AFTER_DELETE);
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

function useDesktopDetection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > DESKTOP_BREAKPOINT);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return isDesktop;
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
  sections: [
    {
      id: 'about',
      title: 'Om',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
    },
    {
      id: 'personal',
      title: 'Privat',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
    }
  ],
  experience: {
    title: 'Erfarenhet',
    items: [
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
  },
  skills: {
    title: 'Kompetenser',
    items: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit']
  }
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
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: false, amount: 0.5 }
  },
  sectionContent: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.6 }
  },
  experienceItem: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.5 }
  },
  skillItem: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 }
  },
  text: {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.6 }
  }
};

const TextSection = ({ section, colors, isDesktop, scrollDirection }) => (
  <motion.section
    className={s.cv__section}
    aria-labelledby={`${section.id}-heading`}
    {...getAnimationProps(isDesktop, animationVariants.section, { duration: 1 }, scrollDirection)}
  >
    <motion.div
      className={s.cv__sectionContent}
      {...getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: 0.8, delay: 0.2 }, scrollDirection)}
    >
      <h3 id={`${section.id}-heading`} className={s.cv__sectionTitle} style={{ color: colors[1] }}>
        {section.title}
      </h3>
      <motion.p
        className={s.cv__text}
        {...getAnimationProps(isDesktop, animationVariants.text, { duration: 0.6, delay: 0.4 }, scrollDirection)}
      >
        {section.text}
      </motion.p>
    </motion.div>
  </motion.section>
);

const ExperienceSection = ({ colors, isDesktop, scrollDirection }) => (
  <motion.section
    className={s.cv__section}
    aria-labelledby="experience-heading"
    {...getAnimationProps(isDesktop, animationVariants.section, { duration: 1 }, scrollDirection)}
  >
    <motion.div
      className={s.cv__sectionContent}
      {...getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: 0.8, delay: 0.2 }, scrollDirection)}
    >
      <h3 id="experience-heading" className={s.cv__sectionTitle} style={{ color: colors[1] }}>
        {content.experience.title}
      </h3>
      <div className={s.cv__timeline} role="list" aria-label="Work experience timeline">
        {content.experience.items.map((exp, i) => (
          <motion.div
            key={i}
            className={s.cv__experience}
            role="listitem"
            {...getAnimationProps(isDesktop, animationVariants.experienceItem, { duration: 0.6, delay: 0.4 + i * 0.1 }, scrollDirection)}
          >
            <div className={s.cv__timelineDot} style={{ backgroundColor: colors[2] }} aria-hidden="true" />
            <div className={s.cv__timelineContent}>
              <div className={s.cv__itemHeader}>
                <h4 className={s.cv__itemTitle}>{exp.title}</h4>
                <span className={s.cv__itemDate}>{exp.period}</span>
              </div>
              <p className={s.cv__itemCompany} style={{ color: colors[1] }}>{exp.company}</p>
              <motion.p
                className={s.cv__text}
                {...getAnimationProps(isDesktop, animationVariants.text, { duration: 0.6, delay: 0.6 + i * 0.1 }, scrollDirection)}
              >
                {exp.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.section>
);

const SkillsSection = ({ colors, isDesktop, scrollDirection }) => (
  <motion.section
    className={s.cv__section}
    aria-labelledby="skills-heading"
    {...getAnimationProps(isDesktop, animationVariants.section, { duration: 1 }, scrollDirection)}
  >
    <motion.div
      className={s.cv__sectionContent}
      {...getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: 0.8, delay: 0.2 }, scrollDirection)}
    >
      <h3 id="skills-heading" className={s.cv__sectionTitle} style={{ color: colors[1] }}>
        {content.skills.title}
      </h3>
      <ul className={s.cv__skillsGrid} role="list" aria-label="Technical skills">
        {content.skills.items.map((skill, i) => (
          <motion.li
            key={skill}
            className={s.cv__skillItem}
            style={{ borderLeftColor: colors[1], backgroundColor: colors[1] + '15' }}
            {...getAnimationProps(isDesktop, animationVariants.skillItem, { duration: 0.5, delay: 0.4 + i * 0.05 }, scrollDirection)}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  </motion.section>
);

function CVOverlay({ visible, colors, theme, setTheme }) {
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
  const mainRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollTop = useRef(0);
  const isDesktop = useDesktopDetection();

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      const { scrollTop, clientHeight } = mainRef.current;
      const sectionIndex = Math.round(scrollTop / clientHeight);

      if (scrollTop > lastScrollTop.current) {
        setScrollDirection('down');
      } else if (scrollTop < lastScrollTop.current) {
        setScrollDirection('up');
      }
      lastScrollTop.current = scrollTop;

      setActiveSection(sectionIndex);
      setShowScrollDown(sectionIndex === 0);
      setShowScrollUp(sectionIndex === TOTAL_SECTIONS - 1);
    };

    const mainEl = mainRef.current;
    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll);
      setTimeout(handleScroll, 100);
      return () => mainEl.removeEventListener('scroll', handleScroll);
    }
  }, [visible, isDesktop]);

  const scrollToSection = useCallback((direction) => {
    if (!mainRef.current) return;
    const { scrollTop, clientHeight } = mainRef.current;
    const currentSection = Math.round(scrollTop / clientHeight);
    const targetSection = direction === 'next' ? currentSection + 1 : currentSection - 1;
    mainRef.current.scrollTo({ top: Math.max(0, targetSection * clientHeight), behavior: 'smooth' });
  }, []);

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

          <div className={s.cv__mainWrapper}>
            <div className={s.cv__scrollProgress}>
              {Array.from({ length: TOTAL_SECTIONS }, (_, i) => (
                <div
                  key={i}
                  className={activeSection === i ? s.cv__scrollDotActive : s.cv__scrollDot}
                />
              ))}
            </div>

            <motion.button
              className={s.cv__scrollIndicatorUp}
              initial={{ opacity: 0 }}
              animate={{ opacity: showScrollUp ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollToSection('prev')}
              aria-label="Scroll to previous section"
            >
              <MdKeyboardArrowUp className={s.cv__scrollChevron} />
            </motion.button>

            <motion.button
              className={s.cv__scrollIndicatorDown}
              initial={{ opacity: 0 }}
              animate={{ opacity: showScrollDown ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollToSection('next')}
              aria-label="Scroll to next section"
            >
              <MdKeyboardArrowDown className={s.cv__scrollChevron} />
            </motion.button>

            <div className={s.cv__main} ref={mainRef} key={isDesktop ? 'desktop' : 'mobile'}>
              {content.sections.map((section) => (
                <TextSection key={section.id} section={section} colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} />
              ))}
              <ExperienceSection colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} />
              <SkillsSection colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const { displayedText, isSelected, showCV, colorShift, theme, setTheme } = useTypingEffect(TIMING.INITIAL_DELAY);
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
