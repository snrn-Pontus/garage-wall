import { AxiosRequestConfig } from 'axios';
import { iMatcher } from '../interfaces/iMatcher';
import { parseParameters } from './parseParameters';
// import { parseQueryParameters } from './parseQueryParameters';

const findMatcher = (matchers: iMatcher[], config: AxiosRequestConfig) => {
  const match = matchers.find(matcher => {
    const urlMatches = matchUrl(matcher, config);
    const noQuery = hasNoQueryParams(matcher, config);

    if (urlMatches && noQuery) {
      return true;
    }

    const queryMatches = matchQueryParams(matcher, config);

    const pathMatches = matchPathParams(matcher, config);

    console.log('pathMatches', pathMatches);
    console.log('queryMatches', queryMatches);

    return (pathMatches && noQuery) || (queryMatches && !noQuery);
  });
  console.log('match', match);
  return match;
};

const hasNoQueryParams = (matcher: iMatcher, config: AxiosRequestConfig) => {
  return (
    (!config.params || Object.keys(config.params).length === 0) &&
    (!matcher.queryParams || Object.keys(matcher.queryParams).length === 0)
  );
};

const matchUrl = (matcher: iMatcher, config: AxiosRequestConfig): boolean => {
  return getUrl(config) === matcher.urlPattern;
};

const matchPathParams = (matcher: iMatcher, config: AxiosRequestConfig) => {
  const url = getUrl(config);

  const params = parseParameters(matcher.routeParams, matcher.urlPattern, url);

  if (!params && !matcher.routeParams) {
    return true;
  }

  if (!params || !matcher.routeParams) {
    return false;
  }

  if (Object.keys(params).length === Object.keys(matcher.routeParams).length) {
    console.log('params', params);
    return true;
  }
  return false;
};

const matchQueryParams = (matcher: iMatcher, config: AxiosRequestConfig) => {
  // const parsedParams = parseQueryParameters(getUrl(config), config.params);

  if (!config.params && !matcher.queryParams) {
    return true;
  }

  if (!config.params || !matcher.queryParams) {
    return false;
  }

  return (
    Object.keys(config.params).length ===
    Object.keys(matcher.queryParams).length
  );
};

const getUrl = (config: AxiosRequestConfig) => {
  return (config.baseURL || '') + (config.url || '');
};

export { findMatcher };
