import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx';
import css from './MainPage.module.css';
import PageHead from './PageHead';
import TrackInfo from './TrackInfo';
import TrackPlayer from './TrackPlayer';
import MainPlayer from './MainPlayer';
import { setOpenGroupId, updateMainTracks } from '../../features/main/mainSlice';
import constants from '../../constants';
let stoppedTrackIdBySwitch = null;

function MainPage() {
	const playersRef = useRef({});
  const mainPlayerRef = useRef();
  const dispatch = useDispatch()
  const mainTracks = useSelector((state) => state.main.mainTracks)
  const openGroupId = useSelector((state) => state.main.openGroupId)
  const handleSelectActive = useCallback((group, track) => {
    const groupIndex = constants.AUDIO_TRACK_DATA.groups.findIndex(g => g.id === group.id);

    if (groupIndex > -1) {
      constants.AUDIO_TRACK_DATA.groups[groupIndex].tracks.forEach(track => {
        if (groupIndex > -1 && playersRef.current[track.id].playing()) {
          playersRef.current[track.id].stop();
          stoppedTrackIdBySwitch = track.id;
        }
      });
    }
    dispatch(setOpenGroupId(null));
    setTimeout(() => {
      dispatch(updateMainTracks({group, track}));
    })
  }, [dispatch])

  useEffect(() => {
    mainPlayerRef.current.stop();
    setTimeout(() => {
      mainPlayerRef.current.refresh();
      if (stoppedTrackIdBySwitch && !playersRef.current[stoppedTrackIdBySwitch].playing()) {
        playersRef.current[stoppedTrackIdBySwitch].play();
        stoppedTrackIdBySwitch = null;
      }
    })
  }, [mainTracks]);

  const handleSwitchClick = useCallback((group, track) => {
    if (openGroupId === group.id) {
      dispatch(setOpenGroupId(null));
    } else {
      dispatch(setOpenGroupId(group.id));
    }
  }, [dispatch, openGroupId]);


  const handleTrackPlay = useCallback((trackItem) => {
    Object.entries(playersRef.current).forEach(([key, value]) => {
      if (!trackItem || trackItem.id !== key) {
        value.stop();
      }
    });
    if (trackItem) {
      mainPlayerRef.current.stop();
    }
  }, []);

  return (
    <div className={css.container}>
      <PageHead/>
      <TrackInfo className={css.trackInfo} data={constants.AUDIO_TRACK_DATA}/>
      <div className={css.audioPlayers}>
        {mainTracks.map((track, index) => {
          const group = constants.AUDIO_TRACK_DATA.groups[index];
          return <div key={track.id} className={clsx(openGroupId === group.id && css.active)}>
            <TrackPlayer
              ref={(r) => {playersRef.current[track.id] = r}}
              key={track.id}
              className={css.trackPlayer}
              track={track}
              onSwitch={() => handleSwitchClick(group, track)}
              hideSwitch={group.tracks.length === 1}
              activeSwitch={openGroupId === group.id}
              onPlay={() => handleTrackPlay(track)}
            />
            <div className={css.collapse}>
              {group.tracks.filter(t => t.id !== track.id).map(trackItem => <TrackPlayer
                ref={(r) => {playersRef.current[trackItem.id] = r}}
                key={trackItem.id}
                className={css.trackPlayer}
                track={trackItem}
                isSubTrack
                onSelect={() => handleSelectActive(group, trackItem)}
                onPlay={() => handleTrackPlay(trackItem)}
              />)}
            </div>
          </div>
        })}
      </div>
      <MainPlayer ref={r => mainPlayerRef.current = r} onPlay={() => handleTrackPlay()}/>
    </div>
  );
}

export default MainPage;
