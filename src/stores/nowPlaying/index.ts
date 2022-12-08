import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NowPlayingModule} from 'models';
import {RootState} from 'stores';

const initialState: NowPlayingModule.NowPlayingStore = {
  nowPlayings: [],
  loading: false,
  page: 1,
  total_results: 0,
  total_pages: 1,
};

export const nowPlayingSlice = createSlice({
  name: 'nowPlaying',
  initialState,
  reducers: {
    getNowPlayings: (state: NowPlayingModule.NowPlayingStore) => {
      state.loading = true;
    },
    getNowPlayingsSuccess: (
      state: NowPlayingModule.NowPlayingStore,
      {payload}: PayloadAction<NowPlayingModule.Response>,
    ) => {
      state.loading = false;
      state.nowPlayings = payload.data?.results;
      state.page = payload.data?.page;
      state.total_results = payload.data?.total_results;
      state.total_pages = payload.data?.total_pages;
    },
    getNowPlayingsFail: (
      state: NowPlayingModule.NowPlayingStore,
      // action: PayloadAction<NowPlayingModule.Error>,
    ) => {
      state.loading = false;
    },
  },
});

export const {getNowPlayings, getNowPlayingsSuccess, getNowPlayingsFail} =
  nowPlayingSlice.actions;

export const nowPlayingStore = (state: RootState) => state.nowPlaying;

export default nowPlayingSlice.reducer;
