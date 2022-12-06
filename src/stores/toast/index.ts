import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'stores';
import {ToastModule} from 'models';
import {ToastTypes} from 'utils';

const initialState: ToastModule.IToast = {
  isVisible: false,
  message: '',
  type: ToastTypes.INFO,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state: ToastModule.IToast,
      action: PayloadAction<ToastModule.IToast>,
    ) => {
      const {message, type} = action.payload;
      if (!!message) {
        Object.assign(state, {
          message,
          type,
          isVisible: true,
        });
      }
    },
    hideToast: () => initialState,
  },
});

export const {showToast, hideToast} = toastSlice.actions;
export const toastStore = (state: RootState) => state.toast;

export default toastSlice.reducer;
