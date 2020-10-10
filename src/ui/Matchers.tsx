import React from 'react';
import { MockBuilder } from '..';

const Matchers = ({ mock }: { mock: MockBuilder }) => {
  return (
    <>
      {Object.keys(mock.paths).map(verb => {
        return (
          <div className={'gw-item'} key={verb}>
            <p>{verb}</p>
            {mock.paths[verb].map(matcher => {
              return (
                <div key={matcher.urlPattern}>
                  <pre>{JSON.stringify(matcher.urlPattern, null, 2)}</pre>
                  <pre>{JSON.stringify(matcher.routeParams, null, 2)}</pre>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Matchers;
