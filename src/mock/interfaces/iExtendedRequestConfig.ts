import { AxiosRequestConfig } from 'axios';
import { iRouteParams } from './iRouteParams';

interface iExtendedRequestConfig extends AxiosRequestConfig {
  routeParams: iRouteParams;
}

export { iExtendedRequestConfig };
