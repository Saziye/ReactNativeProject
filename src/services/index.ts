import { PopularModule } from 'models';
import HttpClient from 'services/HttpClient';
import { ServicePaths } from 'utils';

export class MainApi extends HttpClient {
  public constructor() {
    super();
  }
  public async GetPopulars() {
    return await this.makeGetRequest<PopularModule.Response>(
      ServicePaths.Popular,
    );
  }
}

const api = new MainApi();
export default api;
