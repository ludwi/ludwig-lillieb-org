import { motion } from 'framer-motion';
import { content, animationVariants, ANIMATION_DELAYS } from '../../constants';
import { getAnimationProps } from '../../utils';
import s from './ExperienceSection.module.scss';
import sectionStyles from './Section.module.scss';

export const ExperienceSection = ({ colors, isDesktop, scrollDirection, sectionIndex }) => {
  const itemDurations = [0.5, 0.8];

  return (
    <motion.section
      className={sectionStyles.section}
      aria-labelledby="experience-heading"
      {...getAnimationProps(isDesktop, animationVariants.section, { duration: ANIMATION_DELAYS.SECTION }, scrollDirection, sectionIndex)}
    >
      <motion.div
        className={sectionStyles.section__content}
        {...getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: ANIMATION_DELAYS.CONTENT, delay: 0.2 }, scrollDirection, sectionIndex)}
      >
        <h3 id="experience-heading" className={sectionStyles.section__title} style={{ color: colors[1] }}>
          {content.experience.title}
        </h3>
        <div className={s.experienceSection__timeline} role="list" aria-label="Work experience timeline">
          {content.experience.items.map((exp, i) => {
            const duration = itemDurations[i % itemDurations.length];
            const itemDelay = ANIMATION_DELAYS.ITEM_BASE + i * ANIMATION_DELAYS.ITEM_STAGGER;
            const textDelay = itemDelay + 0.2;

            return (
              <motion.div
                key={i}
                className={s.experienceSection__experience}
                role="listitem"
                {...getAnimationProps(isDesktop, animationVariants.experienceItem, { duration, delay: itemDelay }, scrollDirection)}
              >
                <div className={s.experienceSection__timelineDot} style={{ backgroundColor: 'rgb(247, 127, 0)' }} aria-hidden="true" />
                <div className={s.experienceSection__timelineContent}>
                  <div className={s.experienceSection__itemHeader}>
                    <h4 className={s.experienceSection__itemTitle}>{exp.title}</h4>
                    <span className={s.experienceSection__itemDate}>{exp.period}</span>
                  </div>
                  <p className={s.experienceSection__itemCompany} style={{ color: colors[1] }}>{exp.company}</p>
                  <motion.p
                    className={sectionStyles.section__text}
                    {...getAnimationProps(isDesktop, animationVariants.text, { duration: duration + 0.15, delay: textDelay }, scrollDirection)}
                  >
                    {exp.description}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
};
