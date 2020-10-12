import { iQueryParams } from '../interfaces/iQueryParams';

const parseQueryParameters = (url: string, params: iQueryParams = {}) => {
  console.log('url', url);
  if (Object.keys(params).length > 0) {
    return params;
  }

  let urlSearchParams = new URLSearchParams(new URL(url).searchParams);

  const queryParameters: { [key: string]: string } = {};

  urlSearchParams.sort();
  urlSearchParams.forEach((value, key) => {
    queryParameters[key] = value;
  });

  return queryParameters;
};

export { parseQueryParameters };
