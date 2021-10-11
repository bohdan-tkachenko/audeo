
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { addMuteId, removeMuteId } from '../../features/main/mainSlice';
import css from './TrackPlayer.module.css';

const TrackPlayer = forwardRef(({className, track, isSubTrack, activeSwitch, hideSwitch, onSelect, onSwitch, onPlay}, ref) => {
  const muteTrackIds = useSelector(state => state.main.muteTrackIds)
  const dispatch = useDispatch()
  const audioRef = useRef(track.audio);
  const [playing, setPlaying] = useState(false);

  const handleMuteChange = useCallback(() => {
    let trackIndex = muteTrackIds.indexOf(track.id);

    if (trackIndex >= 0) {
      dispatch(removeMuteId(track.id));
    } else {
      dispatch(addMuteId(track.id));
    }
  }, [muteTrackIds, track, dispatch]);

  useEffect(() => {
    setPlaying(false);
    setTimeout(() => {
      audioRef.current = track.audio;
    })
  }, [track]);

  useEffect(() => {
    if (playing) {
      onPlay();
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing, onPlay]);

  useImperativeHandle(ref, () => ({
    stop() {
      setPlaying(false);
    },
    play() {
      setPlaying(true);
    },
    playing() {
      return playing;
    }
	}));

  return (
    <div className={clsx(css.container, className, muteTrackIds.includes(track.id) && css.disabled)}>
      <button className={css.playButton} onClick={() => setPlaying(!playing)}>{playing ? <i className="fa fa-pause"/> : <i className="fa fa-play"/>}</button>
      <div className={css.label}>{track.label}</div>
      <div className={css.actions}>
        {isSubTrack ?
          <button onClick={onSelect}><i className={clsx("fas", "fa-exchange-alt", css.vertical)}></i></button> :
          !hideSwitch && <button onClick={onSwitch}><i className={clsx("fas", "fa-exchange-alt", activeSwitch && css.activeButton)}></i></button>}
        {!isSubTrack && <button className={css.muteButton} onClick={() => handleMuteChange()}>
          <i className="fas fa-volume-mute"></i>
        </button>}
      </div>
    </div>
  );
});

export default TrackPlayer;
