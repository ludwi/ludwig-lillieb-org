import { content } from '../../constants';
import { SectionHeader } from './SectionHeader';
import s from './CV.module.scss';

export function Personal() {
  return (
    <section className={s.section} aria-labelledby="personal-heading">
      <SectionHeader title="Vid sidan av" id="personal-heading" />
      <div className={s.prose}>
        {content.personal.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
