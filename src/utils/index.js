import { EASING } from '../constants';

export const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getAnimationProps = (isDesktop, variant, customTransition = {}, scrollDirection = 'down') => {
  const yOffset = variant.initial?.y || 0;

  // On mobile, use animate instead of whileInView
  if (!isDesktop) {
    const props = {
      initial: variant.initial,
      animate: variant.whileInView,
      transition: customTransition
    };
    return props;
  }

  // On desktop, use whileInView with scroll direction
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

export const createProfileVariant = (isDesktop, scrollDirection, isFirstLoad) => {
  const xDirection = scrollDirection === 'up' ? -1 : 1;
  const baseViewport = { amount: 0.5 };

  const createVariant = (element, config) => {
    const base = {
      image: {
        initial: { opacity: 0, scale: 0.5 },
        target: { opacity: 1, scale: 1 },
        transition: { duration: 1.2, ease: EASING.BOUNCE, ...config.image?.transition }
      },
      name: {
        initial: { opacity: 0, x: 50 * xDirection },
        target: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: EASING.SMOOTH, ...config.name?.transition }
      },
      role: {
        initial: { opacity: 0, x: 50 * xDirection },
        target: { opacity: 1, x: 0 },
        transition: { duration: 0.85, ease: EASING.SMOOTH, ...config.role?.transition }
      }
    };

    return Object.entries(base).reduce((acc, [key, value]) => {
      acc[key] = {
        initial: value.initial,
        ...(config.useAnimate ? { animate: value.target } : { whileInView: value.target }),
        ...(!config.useAnimate && { viewport: { once: !isDesktop, ...baseViewport } }),
        transition: value.transition
      };
      return acc;
    }, {});
  };

  if (isFirstLoad && isDesktop) {
    return createVariant('firstLoad', {
      useAnimate: true,
      image: { transition: { delay: 0.6 } },
      name: { transition: { delay: 0.9 } },
      role: { transition: { delay: 1.1 } }
    });
  }

  if (isDesktop) {
    return createVariant('desktop', { useAnimate: false });
  }

  // Mobile always uses animate (not whileInView)
  return createVariant('mobile', {
    useAnimate: true,
    image: { transition: { delay: 0.6 } },
    name: { transition: { delay: 0.9 } },
    role: { transition: { delay: 1.1 } }
  });
};
