import { iExtendedRequestConfig } from './iExtendedRequestConfig';
import { iRouteParams } from './iRouteParams';
import { AxiosResponse } from 'axios';
import { iExtendedResponse } from './iExtendedResponse';
import React from 'react';

interface iPendingRequest {
  config: iExtendedRequestConfig;
  routeParams: iRouteParams;
  resolver: {
    resolve: (value?: PromiseLike<AxiosResponse> | AxiosResponse) => void;
    reject: (reason?: any) => void;
    mockResponse: iExtendedResponse;
    setRequests: React.Dispatch<React.SetStateAction<iPendingRequest[]>>;
  };
}

export { iPendingRequest };
