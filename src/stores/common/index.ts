import {createSlice} from '@reduxjs/toolkit';
import {RootState} from 'stores';

interface ICommon {
  loading: boolean;
}

const initialState: ICommon = {
  loading: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    onInit: state => {},
  },
});

export const {onInit} = commonSlice.actions;

export const commonStore = (state: RootState) => state.common;
//Sample data call: const {loading} = useSelector(commonStore);

export default commonSlice.reducer;
