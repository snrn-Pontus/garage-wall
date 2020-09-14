import { MockBuilder } from '../src/mock/MockBuilder';

describe('MockBuilder', () => {
  it('should trigger callback', () => {
    const mockCallback = jest.fn(x => 42 + x);

    const mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, 'data/{dataId}')
      .onReply(mockCallback);

    mockBuilder.request({ method: 'GET', url: 'data/123' });

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should trigger callback on chained builder', () => {
    const mockCallback = jest.fn(x => 42 + x);

    const mock = new MockBuilder()
      .onPut({ '{dataId}': '\\d+' }, `data/{dataId}`)
      .onReply(mockCallback);

    mock.request({ method: 'PUT', url: 'data/123' });

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should trigger callback with the correct arguments', () => {
    const mockCallback = jest.fn(x => 42 + x);

    const mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, 'data/{dataId}')
      .onReply(mockCallback);

    mockBuilder.request({ method: 'GET', url: 'data/123' });

    expect(mockCallback).toHaveBeenCalledWith(
      { method: 'GET', url: 'data/123' },
      { dataId: '123' },
      'data/{dataId}'
    );
  });

  it('should trigger callback with the correct query params', () => {
    const mockCallback = jest.fn(x => 42 + x);

    const mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, 'data/{dataId}')
      .onReply(mockCallback);

    mockBuilder.request({
      method: 'GET',
      url: 'data/123',
      params: { id: 123 },
    });

    expect(mockCallback).toHaveBeenCalledWith(
      { method: 'GET', url: 'data/123', params: { id: 123 } },
      { dataId: '123' },
      'data/{dataId}'
    );
  });

  it('should return different results for different paths', function() {
    const mockCallback = jest.fn(x => 42 + x);

    const mockBuilder = new MockBuilder()
      .onGet({ '{dataId}': '\\d+' }, 'data/{dataId}')
      .onReply(mockCallback)
      .onGet({ '{userId}': '\\d+' }, 'user/{userId}')
      .onReply(mockCallback);

    mockBuilder.request({
      method: 'GET',
      url: 'data/123',
    });

    mockBuilder.request({
      method: 'GET',
      url: 'user/123',
    });

    expect(mockCallback).toHaveBeenCalledWith(
      { method: 'GET', url: 'data/123' },
      { dataId: '123' },
      'data/{dataId}'
    );
    expect(mockCallback).toHaveBeenCalledWith(
      { method: 'GET', url: 'user/123' },
      { userId: '123' },
      'user/{userId}'
    );
  });
});
