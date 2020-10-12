import { iRouteParams } from './iRouteParams';
import { iMockResponseCallback } from './iMockResponseCallback';
import { iQueryParams } from './iQueryParams';

export interface iMatcher {
  urlPattern: string;
  routeParams: iRouteParams;
  queryParams: iQueryParams;
  callback?: iMockResponseCallback;
}
