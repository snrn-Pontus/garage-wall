import axios from 'axios';
import { iInterceptedRequest } from './iInterceptedRequest';

const WaitInterceptor = (
  setRequests: (
    value:
      | ((prevState: iInterceptedRequest[]) => iInterceptedRequest[])
      | iInterceptedRequest[]
  ) => void
) => {
  return axios.interceptors.request.use(
    config =>
      new Promise(async (resolve, reject) => {
        const resolver = () => {
          resolve(config);
          setRequests(requests => {
            return requests.filter(request => {
              return request.id !== config.headers.id;
            });
          });
        };
        const rejecter = () => {
          reject(config);

          setRequests(requests => {
            return requests.filter(request => {
              return request.id !== config.headers.id;
            });
          });
        };
        setRequests(requests => {
          return [
            ...requests,
            { resolver, rejecter, config, id: config.headers.id },
          ];
        });
      }),

    error => {
      return Promise.reject(error);
    }
  );
};

export { WaitInterceptor };
