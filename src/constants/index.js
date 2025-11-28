// ========== COLOR PALETTES ==========
export const COLOR_PALETTE_DARK = ['#ff6038', '#ffda45', '#f5a700', '#e84011', '#40e0d0'];
export const COLOR_PALETTE_LIGHT = ['#e63946', '#ff6038', '#06a77d', '#6930c3', '#0077b6'];

// ========== TYPING ANIMATION CONFIG ==========
export const FINAL_TEXT = 'ludwig lillieborg';
export const MISTAKE_TEXT = 'ludvi ';
export const BACKSPACE_TO_LENGTH = 3;
export const DEBUG_MODE = false;

export const TIMING = {
  INITIAL_DELAY: 2000,
  CURSOR_BLINK: 530,
  TYPING_MIN: 100,
  TYPING_MAX: 250,
  BACKSPACE: 250,
  PAUSE_BEFORE_CORRECTION: 0,
  PAUSE_AFTER_NAME: 1000,
  PAUSE_BEFORE_DELETE: 500,
  PAUSE_AFTER_DELETE: 1500
};

// ========== LAYOUT CONFIG ==========
export const DESKTOP_BREAKPOINT = 900;
export const TOTAL_SECTIONS = 6;

// ========== ANIMATION CONFIG ==========
export const EASING = {
  SMOOTH: [0.25, 0.46, 0.45, 0.94],
  BOUNCE: [0.34, 1.56, 0.64, 1],
  ULTRA_SMOOTH: [0.25, 0.1, 0.25, 1]
};

export const ANIMATION_DELAYS = {
  SECTION: 1,
  CONTENT: 0.8,
  ITEM_BASE: 0.4,
  ITEM_STAGGER: 0.15
};

// ========== CONTENT DATA ==========
// Contact info is base64 encoded to prevent bot scraping
export const content = {
  name: 'Ludwig Lillieborg',
  role: 'Fullstack-utvecklare',
  email: 'bHVkd2lnLmxpbGxpZWJvcmdAZ21haWwuY29t', // base64 encoded
  phone: 'KzQ2NzM1MTE2NTcy', // base64 encoded
  location: 'Lorem, Ipsum',
  sections: [
    {
      id: 'hello',
      title: 'Hej',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
    },
    {
      id: 'about',
      title: 'Om',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
    }
  ],
  experience: {
    title: 'Erfarenhet',
    items: [
      {
        title: 'Lorem Ipsum Dolor',
        company: 'Sit Amet Consectetur',
        period: 'XXXX - Lorem',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        title: 'Adipiscing Elit Sed',
        company: 'Do Eiusmod Tempor',
        period: 'XXXX - XXXX',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ]
  },
  skills: {
    title: 'Kompetenser',
    items: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit']
  },
  contact: {
    title: 'Kontakt'
  }
};

// ========== ANIMATION VARIANTS ==========
export const animationVariants = {
  controls: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.5, duration: 0.4 }
  },
  sidebar: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.3, duration: 0.4 }
  },
  sidebarItem: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 }
  },
  section: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: false, amount: 0.5 }
  },
  sectionContent: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.6 }
  },
  experienceItem: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.5 }
  },
  skillItem: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 }
  },
  text: {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.6 }
  }
};
