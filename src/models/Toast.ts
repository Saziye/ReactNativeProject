import {ToastTypes} from 'utils';

export declare module ToastModule {
  interface IToast {
    isVisible?: boolean;
    message: string;
    type: ToastTypes;
  }
}
