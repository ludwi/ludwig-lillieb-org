import { content } from '../../constants';
import { SectionHeader } from './SectionHeader';
import s from './CV.module.scss';

export function Skills() {
  return (
    <section className={s.section} aria-labelledby="skills-heading">
      <SectionHeader title="Kompetenser" id="skills-heading" />
      <ul className={s.skillsList}>
        {content.skills.map((skill) => (
          <li key={skill.name} className={s.skill}>
            <span className={s.skillName}>{skill.name}</span>
            <span className={s.skillYears}>~{skill.years} år</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
