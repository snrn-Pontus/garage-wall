import { AxiosRequestConfig } from 'axios';
import { iMatcher } from '../iMatcher';
import { parseParameters } from './parseParameters';

const matchRequest = (matchers: iMatcher[], config: AxiosRequestConfig) => {
  return matchers.find(({ routeParams, urlPattern }) => {
    if (urlPattern === config.url) {
      return true;
    }

    let parameters = parseParameters(routeParams, urlPattern, config.url || '');

    return Object.keys(parameters).length > 0;
  });
};

export { matchRequest };
