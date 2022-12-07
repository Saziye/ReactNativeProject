import axios, {AxiosInstance} from 'axios';
import Config from 'environment';
import {ServiceModule} from 'models';
import {EventEmitter} from 'utils';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export default abstract class HttpClient extends EventEmitter {
  protected instance: AxiosInstance;
  private readonly baseURL = Config.BASE_URL;
  constructor() {
    super();
    this.instance = axios.create({
      url: this.baseURL,
      withCredentials: true,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.request.use(
      request => {
        console.log({request});
        return request;
      },
      error => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      response => {
        console.log({response});
        return response;
      },
      error => {
        console.log({error});
        if (typeof error.response !== 'undefined') {
          return {
            success: false,
            status: error.response.status,
            data: error.response.data,
          } as ServiceModule.Response;
        }
      },
    );
  }

  public setToken(token: string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  public async makeGetRequest<T>(
    url: string,
    data?: {[key: string]: any},
  ): Promise<T> {
    data && Object.keys(data).forEach((key) => {
      url = url.replace('@'+key,data[key])
    })
    let reqInstance = await this.instance.get(`${url}`);

    return reqInstance;
  }

  public async makePostRequest<T>(
    url: string,
    data: {[key: string]: any},
  ): Promise<T> {
    let reqInstance = await this.instance.post(url, data);
    return reqInstance;
  }

  protected _handleError = (error: any) => Promise.reject(error);
}
