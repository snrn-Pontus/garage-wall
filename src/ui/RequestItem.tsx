import React, { useState } from 'react';
import { iPendingRequest } from '../mock/interfaces/iPendingRequest';
import { settleRequest } from '../mock/utils/settleRequest';
import UrlComparer from './UrlComparer';
import EditResponse from './EditResponse';

export const RequestItem = ({ request }: { request: iPendingRequest }) => {
  const [expanded, setExpanded] = useState<boolean>();

  return (
    <div className={'gw-item'}>
      <div className={'gw-row space-between'}>
        <UrlComparer
          routeParams={request.resolver.mockResponse.routeParams}
          url={request.config.url}
          urlPattern={request.resolver.mockResponse.urlPattern}
        />

        <div className={'gw-column space-between'}>
          <i
            onClick={() => {
              request.resolver.mockResponse.status = 200;
              settleRequest(request);
            }}
            className={'gg-check-o margin-icon tooltip'}
          >
            <span className="tooltiptext">Return 200</span>
          </i>
          <i
            onClick={() => {
              request.resolver.mockResponse.status = 500;
              settleRequest(request);
            }}
            className={'gg-play-stop-o margin-icon tooltip'}
          >
            <span className="tooltiptext">Return 500</span>
          </i>
        </div>
      </div>

      <i
        className={`gg-arrow-${expanded ? 'down' : 'right'}-o margin-icon`}
        onClick={() => setExpanded(expanded => !expanded)}
      />
      {expanded && (
        <>
          <EditResponse request={request} />
        </>
      )}
    </div>
  );
};
