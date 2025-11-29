import { motion } from 'framer-motion';
import { animationVariants, ANIMATION_DELAYS } from '../../constants';
import { getAnimationProps } from '../../utils';
import { SectionText } from './SectionText';
import s from './Section.module.scss';

export const TextSection = ({ section, colors, isDesktop, scrollDirection, sectionIndex }) => (
  <motion.section
    className={s.section}
    aria-labelledby={`${section.id}-heading`}
    {...getAnimationProps(isDesktop, animationVariants.section, { duration: ANIMATION_DELAYS.SECTION }, scrollDirection, sectionIndex)}
  >
    <motion.div
      className={s.section__content}
      {...getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: ANIMATION_DELAYS.CONTENT, delay: 0.2 }, scrollDirection, sectionIndex)}
    >
      <h3 id={`${section.id}-heading`} className={s.section__title} style={{ color: colors[1] }}>
        {section.title}
      </h3>
      <SectionText
        isDesktop={isDesktop}
        scrollDirection={scrollDirection}
        sectionIndex={sectionIndex}
        duration={0.6}
        delay={ANIMATION_DELAYS.ITEM_BASE}
      >
        {section.text}
      </SectionText>
    </motion.div>
  </motion.section>
);
