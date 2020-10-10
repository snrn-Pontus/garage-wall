import React from 'react';
import { iPendingRequest } from '../mock/interfaces/iPendingRequest';

const EditResponse = ({ request }: { request: iPendingRequest }) => {
  return (
    <div className={'gw-column'}>
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
        rows={10}
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
