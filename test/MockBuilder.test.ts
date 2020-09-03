import { MockBuilder } from '../src/mock/MockBuilder';

describe('MockBuilder', () => {
  it('should trigger callback', () => {
    // const callback = (config, pathParams, queryParams): iMockResponse => {
    //
    //   return { config, pathParams, queryParams };
    // };

    const mockCallback = jest.fn(x => 42 + x);

    const mockBuilder = new MockBuilder().onGet(
      { '{dataId}': '\\d+' },
      'data/{dataId}',
      mockCallback
    );

    mockBuilder.request({ method: 'GET', url: 'data/123' });

    expect(mockCallback).toHaveBeenCalled();
  });
});
