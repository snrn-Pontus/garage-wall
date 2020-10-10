import React from 'react';
import { MockBuilder } from '../MockBuilder';
import axios from 'axios';
import MockAdapter from '../MockAdapter';
import { iPendingRequest } from '../interfaces/iPendingRequest';

const attachMock = (
  mock: MockBuilder,
  setRequests: React.Dispatch<React.SetStateAction<iPendingRequest[]>>
) => {
  axios.defaults.adapter = MockAdapter(mock, setRequests);
};

export { attachMock };
