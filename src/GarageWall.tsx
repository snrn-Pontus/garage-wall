import React from 'react';
import RequestItem from './RequestItem';
import './styles.scss';
import usePendingRequests from './usePendingRequests';

const GarageWall = () => {
  const [pendingRequests] = usePendingRequests();
  return (
    <div className={'container'}>
      <div className={'column'}>
        <h3>Garage-Wall</h3>
        {pendingRequests &&
          pendingRequests.length > 0 &&
          pendingRequests.map(request => {
            return <RequestItem key={request.headers.id} request={request} />;
          })}
      </div>
    </div>
  );
};

export default GarageWall;
