import React from 'react';
import { AxiosRequestConfig } from 'axios';
import axios from 'axios';

const RequestItem = ({ request }: { request: AxiosRequestConfig }) => {
  return (
    <div className={'item'}>
      <p>{request.url}</p>
      <button
        onClick={() => {
          axios(request)
            // .then(res => console.log('RES', res))
            .catch(err => console.log('ERR', err));
        }}
      >
        200
      </button>
      <button
        onClick={() => {
          axios(request)
            // .then(res => console.log('RES', res))
            .catch(err => console.log('ERR', err));
        }}
      >
        404
      </button>
    </div>
  );
};

export default RequestItem;
