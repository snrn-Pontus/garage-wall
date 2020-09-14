import { iMockResponseCallback } from './iMockResponseCallback';
import { AxiosRequestConfig } from 'axios';
import { iRouteParams } from './utils/iRouteParams';
import { parseParameters } from './utils/parseParameters';
import { matchRequest } from './utils/matchRequest';
import { iMatcher } from './iMatcher';
import { iExtendedResponse } from './utils/iExtendedResponse';

export class MockBuilder {
  public paths: {
    [key: string]: iMatcher[];
  } = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
  };

  request = (config: AxiosRequestConfig) => {
    const method = config.method?.toUpperCase() || 'GET';
    const match = matchRequest(this.paths[method], config);

    if (match === undefined) {
      return null;
    }
    let parsedParams = parseParameters(
      match.routeParams || {},
      match.urlPattern,
      config.url || ''
    );

    if (parsedParams === null) {
      return null;
    }
    const callback = match.callback as iMockResponseCallback;
    return callback(config, parsedParams, match.urlPattern);
  };

  setResponse: (
    routeParams: iRouteParams,
    urlPattern: string,
    method: string
  ) => {
    onReply: (callback: iMockResponseCallback) => MockBuilder;
    notFound: () => MockBuilder;
  } = (routeParams: iRouteParams, urlPattern: string, method: string) => {
    return {
      onReply: (callback: iMockResponseCallback) => {
        this.paths[method].push({
          urlPattern: urlPattern,
          routeParams: routeParams,
          callback,
        });
        return this;
      },
      notFound: () => {
        this.paths[method].push({
          urlPattern: urlPattern,
          routeParams: routeParams,
          callback: (config: AxiosRequestConfig) => {
            return {
              status: 404,
              ...config,
            } as iExtendedResponse;
          },
        });
        return this;
      },
    };
  };

  onPut = (routeParams: iRouteParams, urlPattern: string) => {
    return this.setResponse(routeParams, urlPattern, 'PUT');
  };

  onGet = (routeParams: iRouteParams, urlPattern: string) => {
    return this.setResponse(routeParams, urlPattern, 'GET');
  };

  onPost = (routeParams: iRouteParams, urlPattern: string) => {
    return this.setResponse(routeParams, urlPattern, 'POST');
  };

  onDelete = (routeParams: iRouteParams, urlPattern: string) => {
    return this.setResponse(routeParams, urlPattern, 'DELETE');
  };
}
