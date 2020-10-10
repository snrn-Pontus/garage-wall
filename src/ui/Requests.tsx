import React from 'react';
import { RequestItem } from './RequestItem';
import { iPendingRequest } from '../mock/interfaces/iPendingRequest';

const Requests = ({
  pendingRequests,
}: {
  pendingRequests: iPendingRequest[];
}) => {
  return (
    <div>
      {pendingRequests &&
        pendingRequests.map(pendingRequest => {
          return (
            <RequestItem
              key={pendingRequest.config.url}
              request={pendingRequest}
            />
          );
        })}
    </div>
  );
};

export default Requests;
