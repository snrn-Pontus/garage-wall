import { AxiosRequestConfig } from 'axios';
import { iRouteParams } from './utils/iRouteParams';

interface iExtendedRequestConfig extends AxiosRequestConfig {
  routeParams: iRouteParams;
}

export { iExtendedRequestConfig };
