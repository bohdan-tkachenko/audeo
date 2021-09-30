import { useCallback, useState, useRef } from 'react';
import css from './MainPage.module.css';
import PageHead from './PageHead';
import TrackInfo from './TrackInfo';
import TrackPlayer from './TrackPlayer';
import TracksPlayer from './TracksPlayer';
import constants from '../../constants';

function MainPage() {
	const playersRef = useRef(new Array(constants.AUDIO_TRACK_DATA.data.length));
  const [disabledTrackIndexes, setDisabledTrackIds] = useState([]);
  const tracksPlayerRef = useRef();
  const [selectedAudios, setSelectedAudios] = useState(constants.AUDIO_TRACK_DATA.data.map(item => item.data[0]));
  const handleSelectNext = useCallback((index) => {
    const audios = selectedAudios.concat();
    let shouldSkip = false;
    constants.AUDIO_TRACK_DATA.data[index].data.forEach((item, idx) => {
      if (shouldSkip) return;

      if (audios[index].id === item.id) {
        if (constants.AUDIO_TRACK_DATA.data[index].data[idx + 1]) {
          audios[index] = constants.AUDIO_TRACK_DATA.data[index].data[idx + 1];
        } else {
          audios[index] = constants.AUDIO_TRACK_DATA.data[index].data[0];
        }
        shouldSkip = true;
      }
    })
    setSelectedAudios(audios);

    tracksPlayerRef.current.stop();
    setTimeout(() => {
      tracksPlayerRef.current.updateTracks(audios);
    })
  }, [selectedAudios]);


  const handleTrackPlay = useCallback((index) => {
    playersRef.current.forEach((item, idx) => {
      if (index !== idx) {
        item.stop();
      }
    });
    if (index !== undefined) {
      tracksPlayerRef.current.stop();
    }
  }, []);

  const handleDisableToggle = useCallback(index => {
    let newDisabledIds = disabledTrackIndexes.concat();
    let trackIndex = disabledTrackIndexes.indexOf(index);
    if (trackIndex >= 0) {
      newDisabledIds = disabledTrackIndexes.filter(trackIndex => trackIndex !== index);
    } else {
      newDisabledIds.push(index);
    }
    setDisabledTrackIds(newDisabledIds);
    tracksPlayerRef.current.stop();
  }, [disabledTrackIndexes]);

  return (
    <div className={css.container}>
      <PageHead/>
      <TrackInfo className={css.trackInfo} data={constants.AUDIO_TRACK_DATA}/>
      <div className={css.audioPlayers}>
        {constants.AUDIO_TRACK_DATA.data.map((trackItem, index) => <TrackPlayer
          ref={(r) => {playersRef.current[index] = r}}
          key={trackItem.id}
          className={css.trackPlayer}
          selected={selectedAudios[index]}
          disabled={disabledTrackIndexes.includes(index)}
          onNext={() => handleSelectNext(index)}
          onPlay={() => handleTrackPlay(index)}
          onDisableToggle={() => handleDisableToggle(index)}
        />)}
      </div>
      <TracksPlayer ref={r => tracksPlayerRef.current = r} defaultSelected={selectedAudios} disabledIndexes={disabledTrackIndexes} data={constants.AUDIO_TRACK_DATA} onPlay={() => handleTrackPlay()}/>
    </div>
  );
}

export default MainPage;
