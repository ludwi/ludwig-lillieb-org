import { EASING } from '../constants';

export const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getMobileAnimationProps = (variant, customTransition, sectionIndex) => {
  const baseDelay = sectionIndex > 0 ? 1.2 : 0;
  return {
    initial: variant.initial,
    animate: variant.whileInView,
    transition: {
      ...customTransition,
      delay: (customTransition.delay || 0) + baseDelay
    }
  };
};

const getDesktopAnimationProps = (variant, customTransition, scrollDirection) => {
  const yOffset = variant.initial?.y || 0;
  return {
    ...variant,
    initial: {
      ...variant.initial,
      y: scrollDirection === 'up' ? -Math.abs(yOffset) : Math.abs(yOffset)
    },
    viewport: {
      ...variant.viewport,
      once: false
    },
    transition: customTransition
  };
};

export const getAnimationProps = (isDesktop, variant, customTransition = {}, scrollDirection = 'down', sectionIndex = 0) => {
  return isDesktop
    ? getDesktopAnimationProps(variant, customTransition, scrollDirection)
    : getMobileAnimationProps(variant, customTransition, sectionIndex);
};

const PROFILE_ANIMATION_DELAYS = {
  IMAGE: 0.6,
  NAME: 0.9,
  ROLE: 1.1
};

const PROFILE_DISTANCES = {
  NAME: 50,
  ROLE: 35
};

const getProfileBaseVariants = (xDirection) => ({
  image: {
    initial: { opacity: 0, scale: 0.5 },
    target: { opacity: 1, scale: 1 },
    transition: { duration: 1.2, ease: EASING.BOUNCE }
  },
  name: {
    initial: { opacity: 0, x: PROFILE_DISTANCES.NAME * xDirection },
    target: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: EASING.SMOOTH }
  },
  role: {
    initial: { opacity: 0, x: PROFILE_DISTANCES.ROLE * xDirection },
    target: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: EASING.SMOOTH }
  }
});

const buildVariantProps = (baseVariants, config, isDesktop) => {
  const baseViewport = { amount: 0.5 };

  return Object.entries(baseVariants).reduce((acc, [key, value]) => {
    acc[key] = {
      initial: value.initial,
      ...(config.useAnimate ? { animate: value.target } : { whileInView: value.target }),
      ...(!config.useAnimate && { viewport: { once: !isDesktop, ...baseViewport } }),
      transition: { ...value.transition, ...config[key]?.transition }
    };
    return acc;
  }, {});
};

const getAnimatedConfig = () => ({
  useAnimate: true,
  image: { transition: { delay: PROFILE_ANIMATION_DELAYS.IMAGE } },
  name: { transition: { delay: PROFILE_ANIMATION_DELAYS.NAME } },
  role: { transition: { delay: PROFILE_ANIMATION_DELAYS.ROLE } }
});

export const createProfileVariant = (isDesktop, scrollDirection, isFirstLoad) => {
  const xDirection = scrollDirection === 'up' ? -1 : 1;
  const baseVariants = getProfileBaseVariants(xDirection);

  if (isFirstLoad && isDesktop) {
    return buildVariantProps(baseVariants, getAnimatedConfig(), isDesktop);
  }

  if (isDesktop) {
    return buildVariantProps(baseVariants, { useAnimate: false }, isDesktop);
  }

  return buildVariantProps(baseVariants, getAnimatedConfig(), isDesktop);
};
