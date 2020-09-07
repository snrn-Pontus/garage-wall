import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { GarageWall } from '../dist';
import SourceSansPro from '../assets/SourceSansPro-Regular.ttf';

axios.defaults.baseURL = 'http://localhost:1234';

const App = () => {
  return (
    <div>
      <GarageWall />
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
