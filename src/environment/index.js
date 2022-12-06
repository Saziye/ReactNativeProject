import DevConfig from './index.development';
import ProdConfig from './index.production';

const isDevelopment = false;

export default isDevelopment ? DevConfig : ProdConfig;

export {isDevelopment};