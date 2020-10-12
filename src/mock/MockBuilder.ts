import { iMockResponseCallback } from './interfaces/iMockResponseCallback';
import { AxiosRequestConfig } from 'axios';
import { iRouteParams } from './interfaces/iRouteParams';
import { parseParameters } from './utils/parseParameters';
// import { matchRequest } from './utils/matchRequest';
import { iMatcher } from './interfaces/iMatcher';
import { iExtendedResponse } from './interfaces/iExtendedResponse';
import { iQueryParams } from './interfaces/iQueryParams';
import { parseQueryParameters } from './utils/parseQueryParameters';
import { findMatcher } from './utils/findMatcher';

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
    // const match = matchRequest(this.paths[method], config);

    const match = findMatcher(this.paths[method], config);

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

    let parsedQueryParams = parseQueryParameters(
      (config.baseURL || '') + (config.url || ''),
      config.params
    );

    if (parsedQueryParams === null) {
      return null;
    }

    const callback = match.callback as iMockResponseCallback;
    return callback(config, parsedParams, match.urlPattern, parsedQueryParams);
  };

  setResponse: (
    routeParams: iRouteParams,
    urlPattern: string,
    queryParams: iQueryParams,
    method: string
  ) => {
    onReply: (callback: iMockResponseCallback) => MockBuilder;
    notFound: () => MockBuilder;
  } = (
    routeParams: iRouteParams,
    urlPattern: string,
    queryParams,
    method: string
  ) => {
    return {
      onReply: (callback: iMockResponseCallback) => {
        this.paths[method].push({
          urlPattern: urlPattern,
          routeParams: routeParams,
          queryParams: queryParams,
          callback,
        });
        return this;
      },
      notFound: () => {
        this.paths[method].push({
          urlPattern: urlPattern,
          routeParams: routeParams,
          queryParams: queryParams,
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

  onPut = (
    routeParams: iRouteParams,
    urlPattern: string,
    queryParams: iQueryParams
  ) => {
    return this.setResponse(routeParams, urlPattern, queryParams, 'PUT');
  };

  onGet = (
    routeParams: iRouteParams,
    urlPattern: string,
    queryParams: iQueryParams
  ) => {
    return this.setResponse(routeParams, urlPattern, queryParams, 'GET');
  };

  onPost = (
    routeParams: iRouteParams,
    urlPattern: string,
    queryParams: iQueryParams
  ) => {
    return this.setResponse(routeParams, urlPattern, queryParams, 'POST');
  };

  onDelete = (
    routeParams: iRouteParams,
    urlPattern: string,
    queryParams: iQueryParams
  ) => {
    return this.setResponse(routeParams, urlPattern, queryParams, 'DELETE');
  };
}
