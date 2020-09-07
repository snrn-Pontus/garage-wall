import React from 'react';

const UrlComparer = ({ url, urlPattern, routeParams }) => {
  const createUrlPart = (part: string, found: boolean) => {
    return found ? (
      <div key={part} className={'row'}>
        <span className={'url-part'}>/</span>
        <span className={'pattern url-part'}>{part}</span>
      </div>
    ) : (
      <div key={part} className={'row'}>
        <span className={'url-part'}>/</span>
        <span className={'url-part'}>{part}</span>
      </div>
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
    <div className={'column urls'}>
      <div className={'row'}>{urlParts}</div>
      <div className={'row'}>{patternParts}</div>
    </div>
  );
};

export default UrlComparer;
