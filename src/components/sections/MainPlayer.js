
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import constants from '../../constants';
import { setMainPlayerCurrentTIme } from '../../features/main/mainSlice';
import css from './MainPlayer.module.css';

let interval = null;

const MainPlayer = forwardRef(({className, onPlay}, ref) => {
  const mainTracks = useSelector((state) => state.main.mainTracks)
  const dispatch = useDispatch()
  const muteTrackIds = useSelector(state => state.main.muteTrackIds)
  const mainPlayerCurrentTime = useSelector(state => state.main.mainPlayerCurrentTime)
  const [playing, setPlaying] = useState(false);
  const audioRefs = useRef(constants.MAIN_AUDIOS)

  useEffect(() => {
    if (playing) {
      Object.keys(audioRefs.current).forEach(itemId => {
        audioRefs.current[itemId].play();
      });
      onPlay();
      interval = setInterval(() => {
        dispatch(setMainPlayerCurrentTIme(audioRefs.current.BRUSHES.currentTime))
      }, 1000);
    } else {
      interval && clearInterval(interval);
      Object.values(audioRefs.current).forEach(item => {
        item.pause();
      });
    }
  }, [playing, onPlay, dispatch]);

  useEffect(() => {
    const mainTracksIds = mainTracks.map(track => track.id);
    Object.keys(audioRefs.current).forEach((itemId) => {
      if (muteTrackIds.includes(itemId) || !mainTracksIds.includes(itemId)) {
        audioRefs.current[itemId].muted = true;
      } else {
        audioRefs.current[itemId].muted = false;
      }
    });
  }, [muteTrackIds, mainTracks, mainPlayerCurrentTime]);

  useImperativeHandle(ref, () => ({
    stop() {
      setPlaying(false);
    },
    play() {
      setPlaying(true);
    },
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
        <div className={css.description}>{mainTracks.length - muteTrackIds.length} audio stems included</div>
      </div>
      {!!audioRefs.current.BRUSHES.duration && <div className={css.duration}>
        <span className={css.currentPlayed}>{new Date(mainPlayerCurrentTime * 1000).toISOString().substr(14, 5)}</span> / <span>{new Date(audioRefs.current.BRUSHES.duration * 1000).toISOString().substr(14, 5)}</span>
      </div>}
    </div>
  );
});

export default MainPlayer;
