import { RouteModel } from "models";

type RoutePaths = keyof RouteModel;
type Keys = 'home';

const routes: {[key in Keys]: RoutePaths} = {
  home: 'Home',
};

export default routes;
