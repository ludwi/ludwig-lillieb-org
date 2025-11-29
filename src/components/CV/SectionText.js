import { motion } from 'framer-motion';
import { animationVariants } from '../../constants';
import { getAnimationProps } from '../../utils';
import s from './Section.module.scss';

export const SectionText = ({ children, isDesktop, scrollDirection, sectionIndex, duration = 0.6, delay = 0 }) => {
  // If it's a string, treat it as HTML and split by paragraph tags
  if (typeof children === 'string') {
    // Split by <p> tags or line breaks
    const htmlParagraphs = children
      .split(/<\/?p>/gi)
      .filter(p => p.trim() && p.trim() !== '\n');

    return (
      <>
        {htmlParagraphs.map((html, idx) => (
          <motion.p
            key={idx}
            className={s.section__text}
            dangerouslySetInnerHTML={{ __html: html }}
            {...getAnimationProps(
              isDesktop,
              animationVariants.text,
              { duration, delay: delay + (idx * 0.1) },
              scrollDirection,
              sectionIndex
            )}
          />
        ))}
      </>
    );
  }

  // If it's not a string, render as-is
  return (
    <motion.p
      className={s.section__text}
      {...getAnimationProps(
        isDesktop,
        animationVariants.text,
        { duration, delay },
        scrollDirection,
        sectionIndex
      )}
    >
      {children}
    </motion.p>
  );
};
