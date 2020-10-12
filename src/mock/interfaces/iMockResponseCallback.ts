import { AxiosRequestConfig } from 'axios';
import { iExtendedResponse } from './iExtendedResponse';
import { iQueryParams } from './iQueryParams';

interface iMockResponseCallback {
  (
    config: AxiosRequestConfig,
    pathParams: { [param: string]: string },
    urlPattern: string,
    queryParams: iQueryParams
  ): iExtendedResponse;
}

export { iMockResponseCallback };
