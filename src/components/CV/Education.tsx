import { content } from '../../constants';
import { SectionHeader } from './SectionHeader';
import s from './CV.module.scss';

export function Education() {
  return (
    <section className={s.section} aria-labelledby="education-heading">
      <SectionHeader title="Utbildning" id="education-heading" />
      <ol>
        {content.education.map((item) => (
          <li key={item.school} className={s.educationEntry}>
            <span className={s.educationPeriod}>{item.period}</span>
            <div>
              <h3 className={s.educationDegree}>{item.degree}</h3>
              <p className={s.educationSchool}>{item.school}</p>
              <p className={s.educationDescription}>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
