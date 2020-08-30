import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Thing } from '../.';
import axios from 'axios';

const App = () => {
  return (
    <div>
      <Thing />
      <button
        onClick={() => {
          axios
            .get('http://localhost:1234', {
              params: { stop: true, id: Math.random() * 1000 },
            })
            .catch(e => {});
        }}
      >
        Send
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
