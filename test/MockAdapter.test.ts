import MockAdapter from '../src/mock/MockAdapter';
import { attachMock } from '../src/mock/utils/attachAdapter';
import { MockBuilder } from '../src/mock/MockBuilder';
import axios, { AxiosRequestConfig } from 'axios';

describe('MockAdapter', () => {
  const baseUrl = 'http://localhost:1234';

  it('should call the mock', async function() {
    let mockBuilder = new MockBuilder();
    mockBuilder.request = jest.fn((config: AxiosRequestConfig) => {
      return { data: {}, status: 200, headers: [], config, statusText: 'ok' };
    });

    attachMock(mockBuilder, []);

    try {
      await axios.get(baseUrl, {});
    } catch (e) {}

    expect(mockBuilder.request).toHaveBeenCalled();
  });

  it('should do a regular request if no path matches', async function() {
    let mockBuilder = new MockBuilder().onGet(
      { '{dataId}': '\\d+' },
      `${baseUrl}/data/{dataId}`,
      (config, routeParams, urlPattern) => {
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
      }
    );

    const setRequestsMock = jest.fn();

    attachMock(mockBuilder, setRequestsMock);

    try {
      await axios.get(`${baseUrl}`, {});
      expect(setRequestsMock).toHaveBeenCalled();
    } catch (e) {
      console.log('ERROR', e);
    }
  });

  it('should return something', async function() {
    let mockBuilder = new MockBuilder().onGet(
      { '{dataId}': '\\d+' },
      `${baseUrl}/data/{dataId}`,
      (config, routeParams, urlPattern) => {
        config.data = { dog: 'boatsman' };
        return { data: {}, status: 200, headers: [], config, statusText: 'ok' };
      }
    );

    attachMock(mockBuilder, []);

    try {
      const response = await axios.get(`${baseUrl}/data/123`, {});
      expect(response.config.data).toEqual({ dog: 'boatsman' });
    } catch (e) {
      console.log('ERROR', e);
    }
  });

  it('should save requests in a list', async function() {
    let mockBuilder = new MockBuilder().onGet(
      { '{dataId}': '\\d+' },
      `/data/{dataId}`,
      (config, routeParams, urlPattern) => {
        return {
          data: {},
          status: 200,
          headers: [],
          config,
          statusText: 'ok',
          routeParams,
          urlPattern,
        };
      }
    );

    const setRequestsMock = jest.fn(() => {
      return;
    });

    attachMock(mockBuilder, setRequestsMock);

    try {
      axios.get(`/data/123`, {}).then(() => {
        expect(setRequestsMock).toHaveBeenCalled();
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  });
});
