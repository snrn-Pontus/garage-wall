import React, { useState } from 'react';
import { RequestItem } from './RequestItem';
import './styles.scss';
import { usePendingRequests } from './usePendingRequests';
import { MockBuilder } from './index';

export const GarageWall = ({ mock }: { mock: MockBuilder }) => {
  const [pendingRequests] = usePendingRequests(mock);

  const [expanded, setExpanded] = useState<boolean>(false);

  if (!expanded) {
    return (
      <div
        className={'icon-wrapper'}
        onClick={() => setExpanded(expanded => !expanded)}
      >
        <i className={`gg-sidebar-right`} />
      </div>
    );
  }

  return (
    <div className={`container ${expanded ? 'close' : ''}`}>
      <i
        onClick={() => setExpanded(expanded => !expanded)}
        className={'gg-close-o expand-icon'}
      />
      <div className={'column'}>
        <div className={'top'}>
          <h3>Garage-Wall</h3>
        </div>
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
    </div>
  );
};
