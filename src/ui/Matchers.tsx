import React from 'react';
import { MockBuilder } from '..';

const Matchers = ({ mock }: { mock: MockBuilder }) => {
  return <div className={'item'}>{mock.paths['GET'].toString()}</div>;
};

export default Matchers;
