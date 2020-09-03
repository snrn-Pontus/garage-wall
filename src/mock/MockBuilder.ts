import { iMockResponseCallback } from './iMockResponseCallback';
import { AxiosRequestConfig } from 'axios';
import { iRouteParams } from './utils/iRouteParams';

interface iMatcher {
  urlPattern: string;
  callback: iMockResponseCallback;
}

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
    let path = this.paths[config.method];
    path[0].callback();
  };

  onGet = (
    routeParams: iRouteParams,
    urlPattern: string,
    callback: iMockResponseCallback
  ) => {
    this.paths.GET.push({ urlPattern: urlPattern, callback });
    return this;
  };
  onPut = (
    routeParams: iRouteParams,
    urlPattern: string,
    callback: iMockResponseCallback
  ) => {
    this.paths.PUT.push({ urlPattern: urlPattern, callback });
    return this;
  };
  onPost = (
    routeParams: iRouteParams,
    urlPattern: string,
    callback: iMockResponseCallback
  ) => {
    this.paths.POST.push({ urlPattern: urlPattern, callback });
    return this;
  };
  onDelete = (
    routeParams: iRouteParams,
    urlPattern: string,
    callback: iMockResponseCallback
  ) => {
    this.paths.DELETE.push({ urlPattern: urlPattern, callback });
    return this;
  };
}
