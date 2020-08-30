import * as React from 'react';
import axios from 'axios';
import usePendingRequests from './usePendingRequests';

export const Thing = () => {
  const [pendingRequests] = usePendingRequests();

  return (
    <div
      style={{
        padding: 16,
        position: 'fixed',
        height: '100vh',
        width: 250,
        zIndex: 99999,
        background: 'black',
        top: 0,
        right: 0,
        textAlign: 'left',
        color: 'white',
        fontSize: 14,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Garage-Wall</h3>
        {pendingRequests &&
          pendingRequests.map(request => {
            return (
              <div
                className={'item'}
                key={request.params.id}
                style={{ margin: 8, display: 'flex', flexDirection: 'row' }}
              >
                <span>{request.url}</span>
                <button onClick={() => axios(request)}>Send</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
