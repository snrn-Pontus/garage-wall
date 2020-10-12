import { MockBuilder } from '../src/mock/MockBuilder';

describe('MockBuilder', () => {
  const baseUrl = 'http://localhost:1234';

  it('should trigger callback', () => {
    const mockCallback = jest.fn(x => 42 + x);

    const mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, `${baseUrl}/data/{dataId}`, {})
      .onReply(mockCallback);

    mockBuilder.request({ method: 'GET', url: `${baseUrl}/data/123` });

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should trigger callback on chained builder', () => {
    const mockCallback = jest.fn(x => 42 + x);

    const mock = new MockBuilder()
      .onPut({ '{dataId}': '\\d+' }, `${baseUrl}/data/{dataId}`, {})
      .onReply(mockCallback);

    mock.request({ method: 'PUT', url: `${baseUrl}/data/123` });

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should trigger callback with the correct arguments', () => {
    const mockCallback = jest.fn(x => 42 + x);

    const mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, `${baseUrl}/data/{dataId}`, {})
      .onReply(mockCallback);

    mockBuilder.request({ method: 'GET', url: `${baseUrl}/data/123` });

    expect(mockCallback).toHaveBeenCalledWith(
      { method: 'GET', url: `${baseUrl}/data/123` },
      { dataId: '123' },
      `${baseUrl}/data/{dataId}`,
      {}
    );
  });

  it('should trigger callback with the correct query params', () => {
    const mockCallback = jest.fn(x => 42 + x);

    const mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, `${baseUrl}/data/{dataId}`, { id: '123' })
      .onReply(mockCallback);

    mockBuilder.request({
      method: 'GET',
      url: `${baseUrl}/data/123`,
      params: { id: '123' },
    });

    expect(mockCallback).toHaveBeenCalledWith(
      { method: 'GET', url: `${baseUrl}/data/123`, params: { id: '123' } },
      { dataId: '123' },
      `${baseUrl}/data/{dataId}`,
      { id: '123' }
    );
  });

  it('should return different results for different paths', function() {
    const mockCallback = jest.fn(x => 42 + x);

    const mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, `${baseUrl}/data/{dataId}`, {})
      .onReply(mockCallback)
      .onGet({ '{userId}': '\\d+' }, `${baseUrl}/user/{userId}`, {})
      .onReply(mockCallback);

    mockBuilder.request({
      method: 'GET',
      url: `${baseUrl}/data/123`,
    });

    mockBuilder.request({
      method: 'GET',
      url: `${baseUrl}/user/123`,
    });

    expect(mockCallback).toHaveBeenCalledWith(
      { method: 'GET', url: `${baseUrl}/data/123` },
      { dataId: '123' },
      `${baseUrl}/data/{dataId}`,
      {}
    );
    expect(mockCallback).toHaveBeenCalledWith(
      { method: 'GET', url: `${baseUrl}/user/123` },
      { userId: '123' },
      `${baseUrl}/user/{userId}`,
      {}
    );
  });
});
