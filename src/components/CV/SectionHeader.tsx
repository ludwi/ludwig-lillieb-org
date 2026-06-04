import s from './CV.module.scss';

export interface SectionHeaderProps {
  title: string;
  id: string;
}

export function SectionHeader({ title, id }: SectionHeaderProps) {
  return (
    <header className={s.sectionHead}>
      <h2 id={id} className={s.sectionTitle}>{title}</h2>
    </header>
  );
}
