
import clsx from 'clsx';
import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import css from './TrackPlayer.module.css';

const TrackPlayer = forwardRef(({className, selected, disabled, onNext, onPlay, onDisableToggle}, ref) => {
  const audioRef = useRef(new Audio(selected.url));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(false);
    setTimeout(() => {
      audioRef.current = new Audio(selected.url);
    })
  }, [selected]);

  useEffect(() => {
    if (playing) {
      onPlay();
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [playing, onPlay]);

  useImperativeHandle(ref, () => ({
    stop() {
      setPlaying(false);
    },
	}));

  return (
    <div className={clsx(css.container, className, disabled && css.disabled)}>
      <button onClick={() => setPlaying(!playing)}>{playing ? <i className="fa fa-pause"/> : <i className="fa fa-play"/>}</button>
      <div className={css.label}>{selected.label}</div>
      <div className={css.actions}>
        <button onClick={onNext}><i className="fas fa-exchange-alt"></i></button>
        <button onClick={() => onDisableToggle()}>{disabled ? <i className="fas fa-volume-up"></i> : <i className="fas fa-volume-mute"></i>}</button>
      </div>
    </div>
  );
});

export default TrackPlayer;
