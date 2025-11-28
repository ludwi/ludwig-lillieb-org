import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdLightMode, MdDarkMode, MdKeyboardArrowDown } from 'react-icons/md';
import { content, animationVariants, TOTAL_SECTIONS } from '../../constants';
import { useDesktopDetection } from '../../hooks';
import { ProfileSection, TextSection, ExperienceSection, SkillsSection, ContactSection } from './';
import s from './CVOverlay.module.scss';

export function CVOverlay({ visible, colors, theme, setTheme }) {
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
  const mainRef = useRef(null);
  const progressRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [indicatorReady, setIndicatorReady] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const lastScrollTop = useRef(0);
  const isDesktop = useDesktopDetection();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (visible && isFirstLoad.current) {
      const timer = setTimeout(() => {
        isFirstLoad.current = false;
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setIndicatorReady(true);
      }, 2000);
      const animTimer = setTimeout(() => {
        setHasAnimatedIn(true);
      }, 1800);
      return () => {
        clearTimeout(timer);
        clearTimeout(animTimer);
      };
    } else {
      setIndicatorReady(false);
      setHasAnimatedIn(false);
    }
  }, [visible]);

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

  const handleProgressClick = useCallback((e) => {
    if (!mainRef.current) return;
    const { clientHeight } = mainRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = clickY / rect.height;
    const targetSection = Math.round(percentage * (TOTAL_SECTIONS - 1));
    mainRef.current.scrollTo({ top: targetSection * clientHeight, behavior: 'smooth' });
  }, []);

  const handleProgressDrag = useCallback((event, info) => {
    if (!mainRef.current || !progressRef.current) return;
    const { clientHeight } = mainRef.current;
    const rect = progressRef.current.getBoundingClientRect();
    const dragY = info.point.y - rect.top;
    const dragPercentage = Math.max(0, Math.min(1, dragY / rect.height));
    const targetSection = Math.round(dragPercentage * (TOTAL_SECTIONS - 1));
    mainRef.current.scrollTo({ top: targetSection * clientHeight, behavior: 'auto' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={s.cvOverlay}
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.6,
            ease: [0.75, 0, 0.25, 1]
          }}
          role="main"
          aria-label="Curriculum Vitae"
        >
          <motion.div
            className={s.cvOverlay__controls}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <button
              onClick={toggleTheme}
              className={s.cvOverlay__toggle}
              aria-label={`Switch to ${oppositeTheme} mode`}
            >
              {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </motion.div>

          <div className={s.cvOverlay__mainWrapper}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
              <div
                className={s.cvOverlay__scrollProgress}
                ref={progressRef}
                onClick={handleProgressClick}
              >
                <motion.div
                  className={s.cvOverlay__scrollFill}
                  animate={{
                    height: `${(activeSection / (TOTAL_SECTIONS - 1)) * 100}%`
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0}
                  dragMomentum={false}
                  onDrag={handleProgressDrag}
                  _dragX={0}
                  style={{ cursor: 'grab', touchAction: 'none' }}
                  whileDrag={{ cursor: 'grabbing' }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showScrollDown && indicatorReady ? 1 : 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <motion.button
                className={s.cvOverlay__scrollIndicatorDown}
                onClick={() => scrollToSection('next')}
                aria-label="Scroll to next section"
              >
                <MdKeyboardArrowDown className={s.cvOverlay__scrollChevron} />
              </motion.button>
            </motion.div>

            <div className={s.cvOverlay__main} ref={mainRef} key={isDesktop ? 'desktop' : 'mobile'}>
              <ProfileSection colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} isFirstLoad={isFirstLoad.current} />
              {content.sections.map((section, idx) => (
                <TextSection
                  key={section.id}
                  section={section}
                  colors={colors}
                  isDesktop={isDesktop}
                  scrollDirection={scrollDirection}
                  sectionIndex={idx + 1}
                />
              ))}
              <ExperienceSection colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} sectionIndex={content.sections.length + 1} />
              <SkillsSection colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} sectionIndex={content.sections.length + 2} />
              <ContactSection colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} sectionIndex={content.sections.length + 3} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
