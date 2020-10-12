import { AxiosRequestConfig } from 'axios';
import { iMatcher } from '../interfaces/iMatcher';
import { parseParameters } from './parseParameters';
import { parseQueryParameters } from './parseQueryParameters';

const matchRequest = (matchers: iMatcher[], config: AxiosRequestConfig) => {
  return matchers.find(({ routeParams, urlPattern, queryParams }) => {
    if (urlPattern === config.url) {
      return true;
    }

    let pathParameters = parseParameters(
      routeParams,
      urlPattern,
      config.url || ''
    );

    let parsedQueryParameters = parseQueryParameters(
      (config.baseURL || '') + (config.url || ''),
      config.params
    );

    console.log('parsedQueryParameters', parsedQueryParameters);

    return (
      Object.keys(pathParameters).length > 0 &&
      (Object.keys(queryParams).length === 0 ||
        Object.keys(parsedQueryParameters).length > 0)
    );
  });
};

export { matchRequest };
