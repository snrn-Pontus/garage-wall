import React from 'react';
import { iRouteParams } from '../mock/interfaces/iRouteParams';

const UrlComparer = ({
  url = '',
  urlPattern,
  routeParams,
}: {
  url?: string;
  urlPattern: string;
  routeParams: iRouteParams;
}) => {
  const createUrlPart = (part: string, found: boolean) => {
    return found ? (
      <>
        <span className={'url-part'}>/</span>
        <span className={'pattern url-part'}>{part}</span>
      </>
    ) : (
      <>
        <span className={'url-part'}>/</span>
        <span className={'url-part'}>{part}</span>
      </>
    );
  };

  const patternParts = urlPattern
    .split('/')
    .filter(part => part)
    .map(part => {
      const found = Object.keys(routeParams).find(
        key => '{' + key + '}' === part
      );
      return createUrlPart(part, found !== undefined);
    });

  const urlParts = url
    .split('/')
    .filter(part => part)
    .map(part => {
      const found = Object.values(routeParams).find(value => value === part);
      return createUrlPart(part, found !== undefined);
    });

  return (
    <div className={'gw-column urls'}>
      <div className={'gw-row'}>{urlParts}</div>
      <div className={'gw-row'}>{patternParts}</div>
    </div>
  );
};

export default UrlComparer;
