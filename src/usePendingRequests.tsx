import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const usePendingRequests = (): [AxiosRequestConfig[]] => {
  const [pendingRequests, setPendingRequests] = useState<AxiosRequestConfig[]>(
    []
  );

  useEffect(() => {
    const interceptor = () => {
      return axios.interceptors.request.use(
        config => {
          if (config.params['stop']) {
            // Do something before request is sent

            config.params['stop'] = false;
            setPendingRequests(pendingRequests => [...pendingRequests, config]);
            return null;
          } else {
            setPendingRequests(pendingRequests =>
              pendingRequests.filter(
                request => request.params.id !== config.params.id
              )
            );
            return config;
          }
        },
        error => {
          console.log('ERROR', error);
          // Do something with request error
          return Promise.reject(error);
        }
      );
    };
    interceptor();
  }, []);

  useEffect(() => {
    console.log('pendingRequests', pendingRequests);
  }, [pendingRequests]);

  return [pendingRequests];
};

export default usePendingRequests;
