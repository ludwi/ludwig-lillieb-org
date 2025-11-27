import s from './Intro.module.scss';

export const Cursor = ({ visible }) => (
  <span className={s.intro__cursor} style={{ opacity: visible ? 1 : 0 }}>|</span>
);
