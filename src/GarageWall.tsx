import React from 'react';
import { RequestItem } from './RequestItem';
import './styles.scss';
import { usePendingRequests } from './usePendingRequests';

export const GarageWall = () => {
  const [pendingRequests] = usePendingRequests();
  return (
    <div className={'container'}>
      <div className={'column'}>
        <h3>Garage-Wall</h3>
        {pendingRequests &&
          pendingRequests.map(pendingRequest => {
            return (
              <RequestItem key={pendingRequest.id} request={pendingRequest} />
            );
          })}
      </div>
    </div>
  );
};
