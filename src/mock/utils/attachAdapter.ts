import { MockBuilder } from '../MockBuilder';
import axios from 'axios';
import MockAdapter from '../MockAdapter';

const attachMock = (mock: MockBuilder, setRequests) => {
  axios.defaults.adapter = MockAdapter(mock, setRequests);
};

export { attachMock };
