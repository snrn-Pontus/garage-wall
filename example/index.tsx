import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { GarageWall, get } from '../dist';

axios.defaults.baseURL = 'http://localhost:1234';

const App = () => {
  return (
    <div>
      <GarageWall />
      <button
        onClick={() => {
          get('/123/abc', {}).then(res => {
            console.log('RES', res);
          });
        }}
      >
        Send
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
