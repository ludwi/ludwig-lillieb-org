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
      return () => clearTimeout(timer);
    } else {
      setIndicatorReady(false);
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
          initial={{ clipPath: 'circle(0% at 0% 100%)' }}
          animate={{ clipPath: 'circle(150% at 0% 100%)' }}
          exit={{ clipPath: 'circle(0% at 0% 100%)' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 1.2 }}
          role="main"
          aria-label="Curriculum Vitae"
        >
          <motion.div className={s.cvOverlay__controls} {...animationVariants.controls}>
            <button
              onClick={toggleTheme}
              className={s.cvOverlay__toggle}
              aria-label={`Switch to ${oppositeTheme} mode`}
            >
              {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </motion.div>

          <div className={s.cvOverlay__mainWrapper}>
            <div className={s.cvOverlay__scrollProgress} ref={progressRef} onClick={handleProgressClick}>
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
              {content.sections.map((section) => (
                <TextSection
                  key={section.id}
                  section={section}
                  colors={colors}
                  isDesktop={isDesktop}
                  scrollDirection={scrollDirection}
                />
              ))}
              <ExperienceSection colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} />
              <SkillsSection colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} />
              <ContactSection colors={colors} isDesktop={isDesktop} scrollDirection={scrollDirection} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
