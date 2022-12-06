import HttpClient from 'services/HttpClient';

export class MainApi extends HttpClient {
  public constructor() {
    super();
  }
}

const api = new MainApi();
export default api;
