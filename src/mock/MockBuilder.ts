import { iMockResponseCallback } from './iMockResponseCallback';
import { AxiosRequestConfig } from 'axios';
import { iRouteParams } from './utils/iRouteParams';
import { parseParameters } from './utils/parseParameters';
import { matchRequest } from './utils/matchRequest';
import { iMatcher } from './iMatcher';

export class MockBuilder {
  private paths: {
    GET: iMatcher[];
    POST: iMatcher[];
    PUT: iMatcher[];
    DELETE: iMatcher[];
  } = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
  };

  request = (config: AxiosRequestConfig) => {
    let match = matchRequest(this.paths[config.method.toUpperCase()], config);

    if (match === undefined) {
      return null;
    }
    let parsedParams = parseParameters(
      match.routeParams,
      match.urlPattern,
      config.url
    );
    if (parsedParams === null) {
      return null;
    }
    const callback = match.callback as iMockResponseCallback;
    return callback(config, parsedParams, match.urlPattern);
  };

  onGet = (
    routeParams: iRouteParams,
    urlPattern: string,
    callback: iMockResponseCallback
  ) => {
    this.paths.GET.push({
      urlPattern: urlPattern,
      routeParams: routeParams,
      callback,
    });
    return this;
  };
  onPut = (
    routeParams: iRouteParams,
    urlPattern: string,
    callback: iMockResponseCallback
  ) => {
    this.paths.PUT.push({
      urlPattern: urlPattern,
      routeParams: routeParams,
      callback,
    });
    return this;
  };
  onPost = (
    routeParams: iRouteParams,
    urlPattern: string,
    callback: iMockResponseCallback
  ) => {
    this.paths.POST.push({
      urlPattern: urlPattern,
      routeParams: routeParams,
      callback,
    });
    return this;
  };
  onDelete = (
    urlPattern: string,
    routeParams: iRouteParams,
    callback: iMockResponseCallback
  ) => {
    this.paths.DELETE.push({
      urlPattern: urlPattern,
      routeParams: routeParams,
      callback,
    });
    return this;
  };
}
