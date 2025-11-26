import s from '../src/components/App/App.module.scss';

export default function Home() {
  return (
    <div className={s.app}>
      <h1 className={s.app__title}>
        <span className={s.app__word}>
          <span className={`${s.app__letter} ${s['app__letter--1']}`}>l</span>
          <span className={`${s.app__letter} ${s['app__letter--2']}`}>u</span>
          <span className={`${s.app__letter} ${s['app__letter--3']}`}>d</span>
          <span className={`${s.app__letter} ${s['app__letter--4']}`}>w</span>
          <span className={`${s.app__letter} ${s['app__letter--5']}`}>i</span>
          <span className={`${s.app__letter} ${s['app__letter--6']}`}>g</span>
        </span>
        <span className={`${s.app__letter} ${s['app__letter--whitespace']}`}> </span>
        <span className={`${s.app__letter} ${s['app__letter--7']}`}>.</span>
        <span className={s.app__word}>
          <span className={`${s.app__letter} ${s['app__letter--8']}`}>l</span>
          <span className={`${s.app__letter} ${s['app__letter--9']}`}>i</span>
          <span className={`${s.app__letter} ${s['app__letter--10']}`}>l</span>
          <span className={`${s.app__letter} ${s['app__letter--11']}`}>l</span>
          <span className={`${s.app__letter} ${s['app__letter--12']}`}>i</span>
          <span className={`${s.app__letter} ${s['app__letter--13']}`}>e</span>
          <span className={`${s.app__letter} ${s['app__letter--14']}`}>b</span>
        </span>
        <span className={`${s.app__letter} ${s['app__letter--15']}`}>.</span>
        <span className={s.app__word}>
          <span className={`${s.app__letter} ${s['app__letter--16']}`}>o</span>
          <span className={`${s.app__letter} ${s['app__letter--17']}`}>r</span>
          <span className={`${s.app__letter} ${s['app__letter--18']}`}>g</span>
        </span>
      </h1>
    </div>
  );
}
