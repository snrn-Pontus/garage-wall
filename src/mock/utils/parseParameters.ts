import { iRouteParams } from './iRouteParams';

const findParamsInPattern = (
  route: string,
  routeParams: iRouteParams
): string[] =>
  route.split('/').filter(param => routeParams[param] !== undefined);

const replaceUrlPatternsWithRegExp = (
  paramsInPattern: string[],
  urlPattern: string,
  routeParams: iRouteParams
) => {
  paramsInPattern.forEach(param => {
    urlPattern = urlPattern.replace(param, '(' + routeParams[param] + ')');
  });
  return urlPattern;
};

const parseParameters = (
  routeParams: iRouteParams,
  urlPattern: string,
  url: string
) => {
  const parsedParameters: { [key: string]: string } = {};

  // routeParams is null
  if (routeParams === null) {
    return parsedParameters;
  }

  // routeParams is undefined
  if (routeParams === undefined) {
    return parsedParameters;
  }

  // urlPattern is not a string
  if (typeof urlPattern !== 'string') {
    return parsedParameters;
  }

  // match pattern with params
  const paramsInPattern = findParamsInPattern(urlPattern, routeParams);

  // no params found in patterns
  if (paramsInPattern.length === 0) {
    return parsedParameters;
  }

  // replace the pattern placeholders with a regexp string
  urlPattern = replaceUrlPatternsWithRegExp(
    paramsInPattern,
    urlPattern,
    routeParams
  );

  const matchedParamValues = url.match(new RegExp('^' + urlPattern + '$'));

  if (matchedParamValues === null) {
    return parsedParameters;
  }

  paramsInPattern.forEach((param, index) => {
    const matchedParamKeys = param.match(/^:(.+)|{(.+)}$/) || [];
    const paramName = matchedParamKeys[1] || matchedParamKeys[2];
    if (paramName === undefined) {
      return;
    }

    parsedParameters[paramName] = matchedParamValues[index + 1];
  });

  return parsedParameters;
};

export { parseParameters };
