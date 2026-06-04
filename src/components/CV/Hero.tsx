import { content } from '../../constants';
import s from './CV.module.scss';

export function Hero() {
  return (
    <header className={s.hero}>
      <h1 className={s.heroName}>
        <span>{content.firstName}</span>
        <span>{content.lastName}</span>
      </h1>
      <div className={s.heroMeta}>
        <p className={s.heroRole}>{content.role}</p>
        <p className={s.heroLocation}>{content.location}</p>
      </div>
      <p className={s.heroTagline}>{content.tagline}</p>
    </header>
  );
}
