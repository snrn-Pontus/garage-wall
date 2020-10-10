import settle from 'axios/lib/core/settle';
import { iPendingRequest } from '../interfaces/iPendingRequest';

const settleRequest = (request: iPendingRequest) => {
  const {
    resolver: { mockResponse: response, reject, resolve, setRequests },
  }: iPendingRequest = request;

  settle(resolve, reject, response);

  setRequests(requests => requests.filter(req => req !== request));
};

export { settleRequest };
