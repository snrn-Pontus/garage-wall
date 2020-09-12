import { matchRequest } from '../src/mock/utils/matchRequest';
import { iMatcher } from '../src/mock/iMatcher';

describe('matchRequest', function() {
  it('should find a regular url', function() {
    const matchers = [
      {
        urlPattern: '/tjorven',
      },
      {
        urlPattern: '/boatsman',
      },
    ] as iMatcher[];
    const request = {
      url: '/tjorven',
    };
    const request2 = {
      url: '/boatsman',
    };

    const match = matchRequest(matchers, request);
    expect(match).toMatchObject({ urlPattern: '/tjorven' });
    const match2 = matchRequest(matchers, request2);
    expect(match2).toMatchObject({ urlPattern: '/boatsman' });
  });

  it('should find a url with path params', function() {
    const matchers = [
      {
        urlPattern: '/users/{userId}/',
        routeParams: { '{userId}': '\\d+' },
      },
      {
        urlPattern: '/boatsman',
      },
    ];

    const request = {
      url: '/users/123/',
    };

    const match = matchRequest(matchers, request);
    expect(match).toMatchObject({ urlPattern: '/users/{userId}/' });
  });
});
