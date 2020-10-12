import { attachMock } from '../src/mock/utils/attachAdapter';
import { MockBuilder } from '../src/mock/MockBuilder';
import axios from 'axios';

describe('MockAdapter', () => {
  const baseUrl = 'http://localhost:1234';

  it('should do a regular request if no path matches', async function() {
    let mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, `${baseUrl}/data/{dataId}`, {})
      .onReply((config, routeParams, urlPattern) => {
        config.data = { dog: 'boatsman' };
        return {
          data: {},
          status: 200,
          headers: [],
          config,
          statusText: 'ok',
          routeParams,
          urlPattern,
        };
      });

    const setRequestsMock = jest.fn();

    attachMock(mockBuilder, setRequestsMock);

    try {
      axios.get(`${baseUrl}`, {}).then(() => {
        expect(setRequestsMock).toHaveBeenCalled();
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  });

  it('should return something', async function() {
    let mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, `${baseUrl}/data/{dataId}`, {})
      .onReply((config, routeParams, urlPattern) => {
        config.data = { dog: 'boatsman' };
        return {
          data: {},
          status: 200,
          headers: [],
          config,
          statusText: 'ok',
          urlPattern,
          routeParams,
        };
      });

    const setRequestsMock = jest.fn();

    attachMock(mockBuilder, setRequestsMock);

    try {
      axios.get(`${baseUrl}/data/123`, {}).then(response => {
        expect(response.config.data).toEqual({ dog: 'boatsman' });
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  });

  it('should save requests in a list', async function() {
    let mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, `${baseUrl}/data/{dataId}`, {})
      .onReply((config, routeParams, urlPattern) => {
        return {
          data: {},
          status: 200,
          headers: [],
          config,
          statusText: 'ok',
          routeParams,
          urlPattern,
        };
      });

    const setRequestsMock = jest.fn(() => {
      return;
    });

    attachMock(mockBuilder, setRequestsMock);

    try {
      axios.get(`${baseUrl}/data/123`, {}).then(() => {
        expect(setRequestsMock).toHaveBeenCalled();
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  });
});
