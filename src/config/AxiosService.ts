import axios, { AxiosInstance } from "axios";
import {dataType} from '../constants/dataType'
class AxiosService {
  public instance: AxiosInstance;
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }
  handleSuccess(res: any) {
    return res;
  }
  handleError(err: any) {
    return Promise.reject(err);
  }
  get(url: string) {
    return this.instance.get(url);
  }
  post(url: string,data:dataType){
      return this.instance.post(url,data);
  }
}

export default new AxiosService();
