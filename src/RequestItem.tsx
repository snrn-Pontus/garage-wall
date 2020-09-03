import React from 'react';
import { iInterceptedRequest } from './iInterceptedRequest';

export const RequestItem = ({ request }: { request: iInterceptedRequest }) => {
  return (
    <div className={'item'}>
      <p>URL: {request.config.url}</p>
      <p>ID: {request.id}</p>
      <button
        onClick={() => {
          request.resolver();
        }}
      >
        200
      </button>
      <button
        onClick={() => {
          request.rejecter();
        }}
      >
        404
      </button>
    </div>
  );
};
