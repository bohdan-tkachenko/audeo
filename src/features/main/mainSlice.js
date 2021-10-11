import { createSlice } from '@reduxjs/toolkit'
import constants from '../../constants';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    mainTracks: constants.AUDIO_TRACK_DATA.groups.map(item => item.tracks[0]), // active audios
    muteTrackIds: [],
    mainPlayerCurrentTime: 0,
    openGroupId: null,
  },
  reducers: {
    addMuteId: (state, action) => {
      state.muteTrackIds.push(action.payload);
    },
    removeMuteId: (state, action) => {
      state.muteTrackIds = state.muteTrackIds.filter(id => id !== action.payload);
    },
    setOpenGroupId: (state, action) => {
      state.openGroupId = action.payload;
    },
    setMainPlayerCurrentTIme: (state, action) => {
      state.mainPlayerCurrentTime = action.payload;
    },
    updateMainTracks: (state, action) => {
      const {group, track} = action.payload;
      const newMainTracks = state.mainTracks.concat();
      const groupIndex = constants.AUDIO_TRACK_DATA.groups.findIndex(g => g.id === group.id);
      if (groupIndex > -1) {
        newMainTracks[groupIndex] = track;
        state.mainTracks = newMainTracks;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addMuteId, removeMuteId, setOpenGroupId, updateMainTracks, setMainPlayerCurrentTIme } = mainSlice.actions

export default mainSlice.reducer
