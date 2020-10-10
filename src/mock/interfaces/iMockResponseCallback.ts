import { AxiosRequestConfig } from 'axios';
import { iExtendedResponse } from './iExtendedResponse';

interface iMockResponseCallback {
  (
    config: AxiosRequestConfig,
    pathParams: { [param: string]: string },
    urlPattern: string
  ): iExtendedResponse;
}

export { iMockResponseCallback };
