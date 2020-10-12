import { iMatcher } from '../src/mock/interfaces/iMatcher';
import { findMatcher } from '../src/mock/utils/findMatcher';

describe('newMatcher', function() {
  const baseUrl = 'http://localhost:1234';

  it('should find a regular url', function() {
    const matchers = [
      {
        urlPattern: `${baseUrl}/tjorven`,
        routeParams: {},
        queryParams: {},
      },
      {
        urlPattern: `${baseUrl}/boatsman`,
        routeParams: {},
        queryParams: {},
      },
    ] as iMatcher[];

    const request = {
      url: `${baseUrl}/tjorven`,
    };

    const match = findMatcher(matchers, request);
    expect(match).toMatchObject({ urlPattern: `${baseUrl}/tjorven` });
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
        routeParams: {},
        queryParams: {},
      },
    ] as iMatcher[];

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

  it('should not match if query params does not match', function() {
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
