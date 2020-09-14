import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { GarageWall, MockBuilder } from '../dist';
import { useState } from 'react';

axios.defaults.baseURL = 'http://localhost:1234';

const App = () => {
  const [url, setUrl] = useState<string>('/data/123/abc');
  const [lastResponse, setLastResponse] = useState<object>();

  const mock = new MockBuilder()
    .onGet({ '{dataId}': '\\d+', '{word}': '\\w+' }, `/data/{dataId}/{word}`)
    .onReply((config, routeParams, urlPattern) => {
      return {
        routeParams,
        urlPattern,
        data: { ...routeParams },
        status: 200,
        statusText: 'ok',
        headers: {},
        config: config,
        request: null,
      };
    });

  return (
    <div>
      <GarageWall mock={mock} />

      <label>Url</label>
      <input name={'url'} value={url} onChange={e => setUrl(e.target.value)} />
      <button
        onClick={() => {
          axios
            .get(url)
            .then(res => {
              console.log('RES', res);
              setLastResponse(res);
            })
            .catch(err => {
              console.log('ERR', err);
              setLastResponse(err);
            });
        }}
      >
        Send
      </button>

      {lastResponse && <pre>{JSON.stringify(lastResponse, null, 2)}</pre>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
