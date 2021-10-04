
import clsx from 'clsx';
import { useSelector } from 'react-redux'
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import constants from '../../constants';
import css from './MainPlayer.module.css';

let interval = null;

const MainPlayer = forwardRef(({className, onPlay}, ref) => {
  const mainTracks = useSelector((state) => state.main.mainTracks)
  const muteTrackIds = useSelector(state => state.main.muteTrackIds)
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const audioRefs = useRef(mainTracks.map(item => (new Audio(item.url))))
  useEffect(() => {
    if (playing) {
      const shouldPlay = audioRefs.current[0].paused;
      audioRefs.current.forEach((item, index) => {
        if (muteTrackIds.includes(mainTracks[index].id)) {
          item.muted = true;
        } else {
          item.muted = false;

          if (shouldPlay) {
            item.play();
          }
        }
      });
      if (shouldPlay) {
        onPlay();
        setInterval(() => {
          setCurrentTime(new Date(audioRefs.current[0].currentTime * 1000).toISOString().substr(14, 5));
        }, 1000);
      }
    } else {
      audioRefs.current.forEach(item => {
        interval && clearInterval(interval);
        item.pause();
        item.currentTime = 0;
      });
    }
  }, [playing, onPlay, muteTrackIds, mainTracks]);

  useImperativeHandle(ref, () => ({
    stop() {
      setPlaying(false);
    },
    refresh() {
      mainTracks.forEach((item, index) => {
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
        <div className={css.label}>{constants.AUDIO_TRACK_DATA.label}</div>
        <div className={css.description}>{audioRefs.current.length - muteTrackIds.length} audio stems included</div>
      </div>
      {!!audioRefs.current[0].duration && <div className={css.duration}>
        <span className={css.currentPlayed}>{currentTime}</span> / <span>{new Date(audioRefs.current[0].duration * 1000).toISOString().substr(14, 5)}</span>
      </div>}
    </div>
  );
});

export default MainPlayer;
