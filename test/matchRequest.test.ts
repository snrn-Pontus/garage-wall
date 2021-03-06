import { iMatcher } from '../src/mock/interfaces/iMatcher';
import { findMatcher } from '../src/mock/utils/findMatcher';

describe('findMatcher', function() {
  const baseUrl = 'http://localhost:1234';

  it('should find a regular url', function() {
    const matchers = [
      {
        urlPattern: `${baseUrl}/tjorven`,
      },
      {
        urlPattern: `${baseUrl}/boatsman`,
      },
    ] as iMatcher[];
    const request = {
      url: `${baseUrl}/tjorven`,
    };
    const request2 = {
      url: `${baseUrl}/boatsman`,
    };

    const match = findMatcher(matchers, request);
    expect(match).toMatchObject({ urlPattern: `${baseUrl}/tjorven` });
    const match2 = findMatcher(matchers, request2);
    expect(match2).toMatchObject({ urlPattern: `${baseUrl}/boatsman` });
  });

  it('should find a url with path params', function() {
    const matchers = [
      {
        urlPattern: `${baseUrl}/users/{userId}`,
        routeParams: { '{userId}': '\\d+' },
        queryParams: {},
      },
      {
        urlPattern: `${baseUrl}/boatsman`,
        routeParams: { '{userId}': '\\d+' },
        queryParams: {},
      },
    ];

    const request = {
      url: `${baseUrl}/users/123`,
    };

    const match = findMatcher(matchers, request);
    expect(match).toMatchObject({ urlPattern: `${baseUrl}/users/{userId}` });
  });

  it('should find a url with query params', function() {
    const matchers = [
      {
        urlPattern: `${baseUrl}/users`,
        routeParams: {},
        queryParams: { query: '123' },
      },
    ];

    const request = {
      url: `${baseUrl}/users`,
      params: { query: '123' },
    };

    const match = findMatcher(matchers, request);

    expect(match).toMatchObject({
      urlPattern: `${baseUrl}/users`,
      queryParams: { query: '123' },
    });
  });

  it('should not match if request is missing matcher query', function() {
    const matchers = [
      {
        urlPattern: `${baseUrl}/users`,
        routeParams: {},
        queryParams: { query: '123' },
      },
    ];

    const request = {
      url: `${baseUrl}/users`,
      params: {},
    };

    const match = findMatcher(matchers, request);

    expect(match).toBeUndefined();
  });
});
