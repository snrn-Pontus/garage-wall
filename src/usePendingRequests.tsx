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
          if (config.headers['stop']) {
            config.headers['stop'] = false;
            setPendingRequests(pendingRequests => [...pendingRequests, config]);
            return null;
          } else {
            setPendingRequests(pendingRequests =>
              pendingRequests.filter(
                request => request.headers.id !== config.headers.id
              )
            );
            return config;
          }
        },
        error => {
          return Promise.reject(error);
        }
      );
    };
    interceptor();
  }, []);

  useEffect(() => {}, [pendingRequests]);

  return [pendingRequests];
};

export default usePendingRequests;
