import { iExtendedRequestConfig } from '../iExtendedRequestConfig';
import { iRouteParams } from './iRouteParams';
import { AxiosResponse } from 'axios';

interface iExtendedResponse extends AxiosResponse {
  routeParams: iRouteParams;
  urlPattern: string;
}

interface iPendingRequest {
  config: iExtendedRequestConfig;
  routeParams: iRouteParams;
  resolver: {
    resolve: (value?: PromiseLike<AxiosResponse> | AxiosResponse) => void;
    reject: (reason?: any) => void;
    mockResponse: iExtendedResponse;
    setRequests;
  };
}

export { iPendingRequest };
