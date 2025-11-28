import { motion } from 'framer-motion';
import { content, animationVariants, ANIMATION_DELAYS } from '../../constants';
import { getAnimationProps, createProfileVariant } from '../../utils';
import s from './ProfileSection.module.scss';
import sectionStyles from './Section.module.scss';

export const ProfileSection = ({ colors, isDesktop, scrollDirection, isFirstLoad }) => {
  const variants = createProfileVariant(isDesktop, scrollDirection, isFirstLoad);

  // On first load (desktop), skip parent animations to avoid conflicts with child animate
  const sectionProps = (isFirstLoad && isDesktop)
    ? { initial: animationVariants.section.initial, animate: animationVariants.section.whileInView }
    : getAnimationProps(isDesktop, animationVariants.section, { duration: ANIMATION_DELAYS.SECTION }, scrollDirection);

  const contentProps = (isFirstLoad && isDesktop)
    ? { initial: animationVariants.sectionContent.initial, animate: animationVariants.sectionContent.whileInView, transition: { duration: 0 } }
    : getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: ANIMATION_DELAYS.CONTENT, delay: 0.2 }, scrollDirection);

  return (
    <motion.section
      className={sectionStyles.section}
      aria-labelledby="profile-heading"
      {...sectionProps}
    >
      <motion.div
        className={sectionStyles.section__content}
        {...contentProps}
      >
        <div className={s.profileSection__profile}>
          <motion.div className={s.profileSection__imageContainer} {...variants.image}>
            <img
              src="/ludwig_lillieborg.webp"
              alt="Profile photo of Ludwig Lillieborg"
              className={s.profileSection__image}
            />
          </motion.div>
          <div className={s.profileSection__profileInfo}>
            <motion.h2 id="profile-heading" className={s.profileSection__name} {...variants.name} style={{ color: colors[1] }}>
              {content.name}
            </motion.h2>
            <motion.p className={s.profileSection__role} {...variants.role}>{content.role}</motion.p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
