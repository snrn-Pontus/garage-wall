import { AxiosResponse } from 'axios';
import { iRouteParams } from './iRouteParams';

interface iExtendedResponse extends AxiosResponse {
  routeParams: iRouteParams;
  urlPattern: string;
}

export { iExtendedResponse };
