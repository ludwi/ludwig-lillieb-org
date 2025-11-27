import { motion } from 'framer-motion';
import { animationVariants, ANIMATION_DELAYS } from '../../constants';
import { getAnimationProps } from '../../utils';
import s from './Section.module.scss';

export const TextSection = ({ section, colors, isDesktop, scrollDirection }) => (
  <motion.section
    className={s.section}
    aria-labelledby={`${section.id}-heading`}
    {...getAnimationProps(isDesktop, animationVariants.section, { duration: ANIMATION_DELAYS.SECTION }, scrollDirection)}
  >
    <motion.div
      className={s.section__content}
      {...getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: ANIMATION_DELAYS.CONTENT, delay: 0.2 }, scrollDirection)}
    >
      <h3 id={`${section.id}-heading`} className={s.section__title} style={{ color: colors[1] }}>
        {section.title}
      </h3>
      <motion.p
        className={s.section__text}
        {...getAnimationProps(isDesktop, animationVariants.text, { duration: 0.6, delay: ANIMATION_DELAYS.ITEM_BASE }, scrollDirection)}
      >
        {section.text}
      </motion.p>
    </motion.div>
  </motion.section>
);
