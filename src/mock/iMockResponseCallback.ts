import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface iMockResponseCallback {
  (
    config: AxiosRequestConfig,
    pathParams: { [param: string]: string },
    urlPattern: string
  ): AxiosResponse;
}

export { iMockResponseCallback };
