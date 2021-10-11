
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import Waveform from 'waveform-react';
import { useEffect, useState, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { addMuteId, removeMuteId } from '../../features/main/mainSlice';
import { getAudioBuffer, getContext, getWaveWidth } from '../../utils';
import css from './TrackPlayer.module.css';

const TrackPlayer = forwardRef(({className, track, isSubTrack, activeSwitch, hideSwitch, onSelect, onSwitch, onPlay}, ref) => {
  const muteTrackIds = useSelector(state => state.main.muteTrackIds)
  const [buffer, setBuffer] = useState();
  const dispatch = useDispatch()
  const audioRef = useRef(new Audio(track.audio));
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
    const loadAudio = async () => {
      const buffer = await getAudioBuffer(track.audio, getContext());
      setBuffer(buffer);
    }
    loadAudio();
  }, [track.audio]);

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
      <div className={css.wave}>
        <Waveform
          // Audio buffer
          buffer={buffer}
          // waveform height
          height={40}
          markerStyle={{
            // Position marker color
            color: '#fff',
            // Position marker width (in pixels)
            width: 4
          }}
          // Optionally handle user manually changing position (0 - 1)
          onPositionChange={pos => console.log(pos)}
          // Wave plot type (line or bar)
          plot="bar"
          // Marker position on waveform (0 - 1)
          position={0.5}
          // redraw waveform on window size change (default: true)
          responsive={false}
          // Show position marker
          showPosition={false}
          waveStyle={{
            // animate waveform on draw (default: true)
            animate: true,
            // waveform color
            color: '#fff',
            // width of each rendered point (min: 1, max: 10)
            pointWidth: 1
          }}
          width={getWaveWidth()}
        />
      </div>
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
