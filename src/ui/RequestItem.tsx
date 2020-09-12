import React, { useState } from 'react';
import { iPendingRequest } from '../mock/utils/iPendingRequest';
import { settleRequest } from '../mock/utils/settleRequest';
import UrlComparer from './UrlComparer';
import EditResponse from './EditResponse';

export const RequestItem = ({ request }: { request: iPendingRequest }) => {
  const [expanded, setExpanded] = useState<boolean>();

  return (
    <div className={'item'}>
      <div className={'row space-between'}>
        <UrlComparer
          routeParams={request.resolver.mockResponse.routeParams}
          url={request.config.url}
          urlPattern={request.resolver.mockResponse.urlPattern}
        />

        <div className={'column'}>
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
      {expanded ? (
        <i
          className={'gg-arrow-down-o margin-icon'}
          onClick={() => setExpanded(expanded => !expanded)}
        />
      ) : (
        <i
          className={'gg-arrow-right-o margin-icon'}
          onClick={() => setExpanded(expanded => !expanded)}
        />
      )}
      {expanded && (
        <>
          <EditResponse request={request} />

          {/*<pre>{JSON.stringify(request, null, 2)}</pre>*/}
        </>
      )}
    </div>
  );
};
