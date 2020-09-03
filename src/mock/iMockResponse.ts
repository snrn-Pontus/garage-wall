import { AxiosRequestConfig } from 'axios';

interface iMockResponse {
  config: AxiosRequestConfig;
  pathParams: { [param: string]: string };
  queryParams: { [query: string]: string };
}

export { iMockResponse };
