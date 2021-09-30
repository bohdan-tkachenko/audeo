
import clsx from 'clsx';
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import css from './TracksPlayer.module.css';

const TracksPlayer = forwardRef(({className, defaultSelected, disabledIndexes, data, onPlay}, ref) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const audioRefs = useRef(defaultSelected.map(item => (new Audio(item.url))))
  const interval = null;
  useEffect(() => {
    if (playing) {
      audioRefs.current.forEach((item, index) => {
        if (!disabledIndexes.includes(index)) {
          item.play();
        }
      });
      onPlay();
      setInterval(() => {
        setCurrentTime(new Date(audioRefs.current[0].currentTime * 1000).toISOString().substr(11, 8));
      }, 1000);
    } else {
      audioRefs.current.forEach(item => {
        interval && clearInterval(interval);
        item.pause();
        item.currentTime = 0;
      });
    }
  }, [playing, onPlay, disabledIndexes]);

  useImperativeHandle(ref, () => ({
    stop() {
      setPlaying(false);
    },
    updateTracks(selected) {
      selected.forEach((item, index) => {
        audioRefs.current[index] = new Audio(item.url);
      })
    }
	}));

  return (
    <div className={clsx(css.container, className)}>
      <div className={css.actions}>
        <button><i className="fas fa-backward"></i></button>
        <button onClick={() => setPlaying(!playing)}>{playing ? <i className="fa fa-pause"/> : <i className="fa fa-play"/>}</button>
        <button><i className="fas fa-forward"></i></button>
      </div>
      <div className={css.text}>
        <div className={css.label}>{data.label}</div>
        <div className={css.description}>{audioRefs.current.length} audio stems included</div>
      </div>
      {!!audioRefs.current[0].duration && <div className={css.duration}>
        <span className={css.currentPlayed}>{currentTime}</span> / <span>{new Date(audioRefs.current[0].duration * 1000).toISOString().substr(11, 8)}</span>
      </div>}
    </div>
  );
});

export default TracksPlayer;
