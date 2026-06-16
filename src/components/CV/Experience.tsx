import { content } from '../../constants';
import { SectionHeader } from './SectionHeader';
import s from './CV.module.scss';

export function Experience() {
  return (
    <section className={s.section} aria-labelledby="experience-heading">
      <SectionHeader title="Erfarenhet" id="experience-heading" />
      <ol className={s.experienceList}>
        {content.experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className={s.experienceEntry}>
            <h3 className={s.experienceTitle}>{job.title}</h3>
            <p className={s.experienceMeta}>
              <strong>{job.company}</strong>
              {job.location ? ` · ${job.location}` : null}
            </p>
            <span className={s.experiencePeriod}>{job.period}</span>
            <div className={s.experienceParagraphs}>
              {job.paragraphs.map((paragraph, i) => (
                <p key={i} className={s.experienceParagraph}>{paragraph}</p>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
