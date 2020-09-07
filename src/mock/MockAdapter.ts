import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import settle from 'axios/lib/core/settle';
import { MockBuilder } from './MockBuilder';

const MockAdapter = (mock: MockBuilder, setRequests) => {
  return (config: AxiosRequestConfig): AxiosPromise => {
    return new Promise(
      (
        resolve: (value?: PromiseLike<AxiosResponse> | AxiosResponse) => void,
        reject: (reason?: any) => void
      ) => {
        let mockResponse: AxiosResponse = mock.request(config);

        if (mockResponse && Object.keys(mockResponse).length > 0) {
          setRequests(requests => {
            return [
              ...requests,
              {
                config: config,
                resolver: { resolve, reject, mockResponse, setRequests },
              },
            ];
          });
          return;
        } else {
          httpAdapter(config)
            .then(response => {
              settle(resolve, reject, response);
            })
            .catch(reject);
        }
      }
    );
  };
};

export default MockAdapter;
