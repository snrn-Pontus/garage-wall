import React from 'react';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import settle from 'axios/lib/core/settle';
import { MockBuilder } from './MockBuilder';
import { iPendingRequest } from './utils/iPendingRequest';

const MockAdapter = (
  mock: MockBuilder,
  setRequests: React.Dispatch<React.SetStateAction<iPendingRequest[]>>
) => {
  return (config: AxiosRequestConfig): AxiosPromise => {
    return new Promise(
      (
        resolve: (value?: PromiseLike<AxiosResponse> | AxiosResponse) => void,
        reject: (reason?: any) => void
      ) => {
        let mockResponse: AxiosResponse | null = mock.request(config);

        if (mockResponse && Object.keys(mockResponse).length > 0) {
          setRequests((requests: iPendingRequest[]) => {
            return [
              ...requests,
              {
                config: config,
                resolver: { resolve, reject, mockResponse, setRequests },
              },
            ] as iPendingRequest[];
          });
          return;
        } else {
          httpAdapter(config)
            .then((response: any) => {
              settle(resolve, reject, response);
            })
            .catch(reject);
        }
      }
    );
  };
};

export default MockAdapter;
