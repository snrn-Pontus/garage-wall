import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import settle from 'axios/lib/core/settle';

const MockAdapter = (config: AxiosRequestConfig): AxiosPromise<any> =>
  new Promise((resolve, reject) => {
    console.log('config', config);

    if (config.url === '/123/abc') {
      const res: AxiosResponse = {
        config: config,
        status: 200,
        statusText: '',
        data: config.data,
        headers: config.headers,
      };
      settle(resolve, reject, res);
      return;
    }

    httpAdapter(config)
      .then(response => {
        if (response.status === 200) {
          // && response.data contains particular error
          // log if desired
          response.status = 503;
        }
        settle(resolve, reject, response);
      })
      .catch(reject);
  });

export default MockAdapter;
