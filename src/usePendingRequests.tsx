import { useEffect, useState } from 'react';
import { attachMock } from './mock/utils/attachAdapter';
import { MockBuilder } from './mock/MockBuilder';
import { iPendingRequest } from './mock/utils/iPendingRequest';

export const usePendingRequests = (mock: MockBuilder): [iPendingRequest[]] => {
  const [requests, setRequests] = useState<iPendingRequest[]>([]);

  useEffect(() => {
    attachMock(mock, setRequests);
  }, []);

  useEffect(() => {}, [requests]);

  return [requests];
};
