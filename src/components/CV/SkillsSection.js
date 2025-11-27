import { motion } from 'framer-motion';
import { content, animationVariants, ANIMATION_DELAYS } from '../../constants';
import { getAnimationProps } from '../../utils';
import s from './SkillsSection.module.scss';
import sectionStyles from './Section.module.scss';

export const SkillsSection = ({ colors, isDesktop, scrollDirection }) => (
  <motion.section
    className={sectionStyles.section}
    aria-labelledby="skills-heading"
    {...getAnimationProps(isDesktop, animationVariants.section, { duration: ANIMATION_DELAYS.SECTION }, scrollDirection)}
  >
    <motion.div
      className={sectionStyles.section__content}
      {...getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: ANIMATION_DELAYS.CONTENT, delay: 0.2 }, scrollDirection)}
    >
      <h3 id="skills-heading" className={sectionStyles.section__title} style={{ color: colors[1] }}>
        {content.skills.title}
      </h3>
      <ul className={s.skillsSection__skillsGrid} role="list" aria-label="Technical skills">
        {content.skills.items.map((skill, i) => (
          <motion.li
            key={skill}
            className={s.skillsSection__skillItem}
            style={{ borderLeftColor: colors[1], backgroundColor: colors[1] + '15' }}
            {...getAnimationProps(isDesktop, animationVariants.skillItem, { duration: 0.5, delay: ANIMATION_DELAYS.ITEM_BASE + i * 0.05 }, scrollDirection)}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  </motion.section>
);
