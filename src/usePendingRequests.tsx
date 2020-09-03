import { useEffect, useState } from 'react';
import { WaitInterceptor } from './WaitInterceptor';
import { iInterceptedRequest } from './iInterceptedRequest';
import axios, { AxiosResponse } from 'axios';

export const usePendingRequests = (): [iInterceptedRequest[]] => {
  const [requests, setRequests] = useState<iInterceptedRequest[]>([]);

  useEffect(() => {
    // testMock();
    // axios.defaults.adapter = MockAdapter;
    WaitInterceptor(setRequests);
    axios.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('RES', res);
        res.status = 404;
        return res;
      },
      error => {
        return error;
      }
    );
  }, []);

  useEffect(() => {}, [requests]);

  return [requests];
};
