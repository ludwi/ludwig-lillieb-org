import { content } from '../../constants';
import { SectionHeader } from './SectionHeader';
import s from './CV.module.scss';

export function Skills() {
  return (
    <section className={s.section} aria-labelledby="skills-heading">
      <SectionHeader title="Kompetenser" id="skills-heading" />
      <div className={s.skillGroups}>
        {content.skills.map((group) => (
          <div key={group.category} className={s.skillGroup}>
            <h3 className={s.skillGroupTitle}>{group.category}</h3>
            <ul className={s.skillItems}>
              {group.items.map((item) => (
                <li key={item} className={s.skillItem}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
