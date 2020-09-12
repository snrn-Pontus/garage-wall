import React from 'react';
import { iPendingRequest } from '../mock/utils/iPendingRequest';

const EditResponse = ({ request }: { request: iPendingRequest }) => {
  return (
    <div className={'column'}>
      <label>Status</label>
      <input
        defaultValue={request.resolver.mockResponse.status}
        onChange={e => {
          request.resolver.mockResponse.status = Number.parseInt(
            e.target.value
          );
        }}
      />

      <label>Data</label>
      <textarea
        defaultValue={JSON.stringify(
          request.resolver.mockResponse.data,
          null,
          2
        )}
        onChange={e => {
          request.resolver.mockResponse.data = JSON.parse(e.target.value);
        }}
      />
    </div>
  );
};

export default EditResponse;
