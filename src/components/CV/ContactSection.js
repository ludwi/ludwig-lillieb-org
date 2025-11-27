import { motion } from 'framer-motion';
import { MdEmail, MdPhone } from 'react-icons/md';
import { content, animationVariants, ANIMATION_DELAYS } from '../../constants';
import { getAnimationProps } from '../../utils';
import { decode, handleContactClick } from '../../utils/obfuscate';
import s from './ContactSection.module.scss';
import sectionStyles from './Section.module.scss';

export const ContactSection = ({ colors, isDesktop, scrollDirection }) => {
  const email = decode(content.email);
  const phone = decode(content.phone);

  return (
    <motion.section
      className={sectionStyles.section}
      aria-labelledby="contact-heading"
      {...getAnimationProps(isDesktop, animationVariants.section, { duration: ANIMATION_DELAYS.SECTION }, scrollDirection)}
    >
      <motion.div
        className={sectionStyles.section__content}
        {...getAnimationProps(isDesktop, animationVariants.sectionContent, { duration: ANIMATION_DELAYS.CONTENT, delay: 0.2 }, scrollDirection)}
      >
        <h3 id="contact-heading" className={sectionStyles.section__title} style={{ color: colors[1] }}>
          {content.contact.title}
        </h3>
        <div className={s.contactSection__contactInfo}>
          <motion.div
            {...getAnimationProps(isDesktop, animationVariants.text, { duration: 0.6, delay: ANIMATION_DELAYS.ITEM_BASE }, scrollDirection)}
          >
            <motion.button
              onClick={() => handleContactClick('email', content.email)}
              className={s.contactSection__contactLink}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <MdEmail className={s.contactSection__contactIcon} />
              <span>{email}</span>
            </motion.button>
          </motion.div>
          <motion.div
            {...getAnimationProps(isDesktop, animationVariants.text, { duration: 0.8, delay: 0.5 }, scrollDirection)}
          >
            <motion.button
              onClick={() => handleContactClick('phone', content.phone)}
              className={s.contactSection__contactLink}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <MdPhone className={s.contactSection__contactIcon} />
              <span>{phone}</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
