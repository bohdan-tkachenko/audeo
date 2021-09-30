import clsx from 'clsx';
import css from './TrackInfo.module.css';

function TrackInfo({className, data}) {
  return (
    <div className={clsx(css.container, className)}>
      <div className={css.label}>MUSIC GENRE / ARTIST NAME</div>
      <h1>{data.label}</h1>
      <button>BUY THIS TRACK</button>
    </div>
  );
}

export default TrackInfo;
