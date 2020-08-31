import * as React from 'react';
import GarageWall, { get } from '../src';
import axios from 'axios';
import { act, render } from '@testing-library/react';

beforeEach(() => {
  for (let i = 0; i < 10; i++) {
    axios.interceptors.request.eject(i);
  }
});

describe('it', () => {
  it('renders without crashing', () => {
    render(<GarageWall />);
  });

  it('should add interceptors to axios', () => {
    render(<GarageWall />);

    console.log('lol', axios.interceptors.request['handlers']);
    expect(
      axios.interceptors.request['handlers'][1]['fulfilled']
    ).toBeDefined();
  });

  it('should not return anything when send is blocked', async () => {
    render(<GarageWall />);

    await act(async () => {
      const res = await get('url', {});
      expect(res).toBeUndefined();
    });
  });
});
