import { iRouteParams } from './iRouteParams';
import { iMockResponseCallback } from './iMockResponseCallback';

export interface iMatcher {
  urlPattern: string;
  routeParams: iRouteParams;
  callback?: iMockResponseCallback;
}
