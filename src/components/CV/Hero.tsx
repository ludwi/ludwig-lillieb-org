import type { ReactNode } from 'react';
import { content } from '../../constants';
import s from './CV.module.scss';

const DOTLESS_I = 'ı';

type Slot = { idx: number; className?: string; dotless?: boolean };

function wrapLetters(word: string, slots: Slot[]) {
  const sorted = [...slots].sort((a, b) => a.idx - b.idx);
  const parts: ReactNode[] = [];
  let cursor = 0;
  sorted.forEach(({ idx, className, dotless }, i) => {
    if (idx > cursor) parts.push(word.slice(cursor, idx));
    parts.push(
      <span key={i} className={className} aria-hidden="true">
        {dotless ? DOTLESS_I : word[idx]}
      </span>
    );
    cursor = idx + 1;
  });
  if (cursor < word.length) parts.push(word.slice(cursor));
  return <>{parts}</>;
}

export function Hero() {
  const fullName = `${content.firstName} ${content.lastName}`;
  return (
    <header className={s.hero}>
      <h1 className={s.heroName} aria-label={fullName}>
        <span aria-hidden="true">
          {wrapLetters(content.firstName, [{ idx: 4, className: s.iTop, dotless: true }])}
        </span>
        <span aria-hidden="true">
          {wrapLetters(content.lastName, [
            { idx: 1, className: s.iStatic, dotless: true },
            { idx: 4, className: s.iBottom, dotless: true },
          ])}
        </span>
      </h1>
      <div className={s.heroMeta}>
        <p className={s.heroRole}>{content.role}</p>
        <p className={s.heroLocation}>{content.location}</p>
      </div>
      <p className={s.heroTagline}>{content.tagline}</p>
    </header>
  );
}
