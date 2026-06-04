import { content } from '../../constants';
import { SectionHeader } from './SectionHeader';
import s from './CV.module.scss';

export function About() {
  return (
    <section className={s.section} aria-labelledby="about-heading">
      <SectionHeader title="Om" id="about-heading" />
      <div className={s.prose}>
        {content.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
