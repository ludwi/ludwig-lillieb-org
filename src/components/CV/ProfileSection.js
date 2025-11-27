import { motion } from 'framer-motion';
import { content, animationVariants, ANIMATION_DELAYS } from '../../constants';
import { getAnimationProps, createProfileVariant } from '../../utils';
import s from './ProfileSection.module.scss';
import sectionStyles from './Section.module.scss';

export const ProfileSection = ({ colors, isDesktop, scrollDirection, isFirstLoad }) => {
  const variants = createProfileVariant(isDesktop, scrollDirection, isFirstLoad);

  return (
    <motion.section
      className={sectionStyles.section}
      aria-labelledby="profile-heading"
      {...getAnimationProps(isDesktop, animationVariants.section, { duration: ANIMATION_DELAYS.SECTION }, scrollDirection)}
    >
      <motion.div
        className={sectionStyles.section__content}
        {...getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: ANIMATION_DELAYS.CONTENT, delay: 0.2 }, scrollDirection)}
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
            <motion.h2 id="profile-heading" className={s.profileSection__name} {...variants.name}>
              {content.name.split('').map((char, i) => (
                <span
                  key={i}
                  style={{
                    color: colors[i % colors.length]
                  }}
                >
                  {char}
                </span>
              ))}
            </motion.h2>
            <motion.p className={s.profileSection__role} {...variants.role}>{content.role}</motion.p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
