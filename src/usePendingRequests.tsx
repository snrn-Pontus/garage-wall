import { useEffect, useState } from 'react';
import { attachMock } from './mock/utils/attachAdapter';
import { MockBuilder } from './mock/MockBuilder';
import { iPendingRequest } from './mock/utils/iPendingRequest';

export const usePendingRequests = (): [iPendingRequest[]] => {
  const [requests, setRequests] = useState<iPendingRequest[]>([]);

  useEffect(() => {
    attachMock(
      new MockBuilder().onGet(
        { '{dataId}': '\\d+', '{word}': '\\w+' },
        `/data/{dataId}/{word}`,
        (config, routeParams, urlPattern) => {
          return {
            routeParams,
            urlPattern,
            data: { hej: 'svej', boatsman: 'tjorven' },
            status: 200,
            statusText: 'ok',
            headers: {},
            config: config,
            request: null,
          };
        }
      ),
      setRequests
    );
  }, []);

  useEffect(() => {}, [requests]);

  return [requests];
};
