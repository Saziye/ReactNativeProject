import {
    CommonActions,
    createNavigationContainerRef,
    StackActions,
  } from '@react-navigation/native';
  import {RouteModel} from 'models';
  
  export const navigationRef = createNavigationContainerRef<RouteModel>();
  
  export function navigate(name: keyof RouteModel, params?: any) {
    navigationRef.current?.navigate(name, params);
  }
  
  export function navigateAndReset(routes: any[] = [], index = 0) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
  
  export function navigateAndSimpleReset(name: string, index = 0) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes: [{name}],
      }),
    );
  }
  
  export function navigateGoBack() {
    navigationRef.current?.goBack();
  }
  
  export function getCurrentPathName() {
    return navigationRef.current?.getCurrentRoute();
  }
  
  export function navigatePopToTop() {
    const popAction = StackActions.pop(1);
    navigationRef.current?.dispatch(popAction);
  }
  