import 'react-app-polyfill/ie11';
import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { GarageWall, MockBuilder } from '../dist';
import './styles.scss';

axios.defaults.baseURL = 'http://localhost:1234';

const App = () => {
  const [url, setUrl] = useState<string>('/data/123/abc');
  const [lastResponse, setLastResponse] = useState<object>();

  const [loading, setLoading] = useState<boolean>(false);

  const mock = new MockBuilder()
    .onGet(
      { '{dataId}': '\\d+', '{word}': '\\w+' },
      `/data/{dataId}/{word}`,
      {}
    )
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
    })
    .onGet(
      { '{dataId}': '\\d+', '{word}': '\\w+' },
      `/another/{dataId}/{word}`,
      { hej: 'svej' }
    )
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
    <div className={'container'}>
      <GarageWall mock={mock} />

      <div className={'column'}>
        <h3>Test request</h3>
        <input
          name={'url'}
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button
          className={'request-button'}
          onClick={() => {
            setLoading(true);
            setLastResponse(undefined);
            axios
              .get(url, { baseURL: 'http://localhost:1234' })
              .then(res => {
                console.log('RES', res);
                setLastResponse(res);
                setLoading(false);
              })
              .catch(err => {
                console.log('ERR', err);
                setLastResponse(err);
                setLoading(false);
              });
          }}
        >
          Send
        </button>
        {loading && (
          <div className={'spinner'}>
            <p className={'dollar'}>§</p>
          </div>
        )}
        {lastResponse && (
          <div className={'inset'}>
            <pre className={'response'}>
              {JSON.stringify(lastResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
