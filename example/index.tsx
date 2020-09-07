import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { GarageWall, MockBuilder } from '../dist';

axios.defaults.baseURL = 'http://localhost:1234';

const App = () => {
  return (
    <div>
      <GarageWall
        mock={new MockBuilder().onGet(
          { '{dataId}': '\\d+', '{word}': '\\w+' },
          `/data/{dataId}/{word}`,
          (config, routeParams, urlPattern) => {
            return {
              routeParams,
              urlPattern,
              data: { hej: 'svej', boatsman: 'tjorven' },
              status: 200,
              statusText: 'ok',
              headers: {},
              config: config,
              request: null,
            };
          }
        )}
      />
      <button
        onClick={() => {
          axios
            .get('/data/123/abc')
            .then(res => {
              console.log('RES', res);
            })
            .catch(err => {
              console.log('ERR', err);
            });
        }}
      >
        Send
      </button>
      <button
        onClick={() => {
          axios
            .get('/data/123/abc')
            .then(res => {
              console.log('RES', res);
            })
            .catch(err => {
              console.log('ERR', err);
            });
        }}
      >
        Send
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
