import { AxiosRequestConfig } from 'axios';
import { iMockResponse } from './iMockResponse';

interface iMockResponseCallback {
  (
    config: AxiosRequestConfig,
    pathParams: { [param: string]: string },
    queryParams: { [query: string]: string }
  ): iMockResponse;
}

export { iMockResponseCallback };
