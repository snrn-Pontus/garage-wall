import { parseQueryParameters } from '../src/mock/utils/parseQueryParameters';

describe('parseQueryParameters', () => {
  const baseUrl = 'http://localhost:1234';

  it('should match a query parameter', function() {
    let parsedParameters = parseQueryParameters(`${baseUrl}?user=tjorven`);

    expect(parsedParameters).toEqual({
      user: ['tjorven'],
    });
  });

  it('should match multiple query parameters', function() {
    let parsedParameters = parseQueryParameters(
      `${baseUrl}?user=tjorven&userId=747`
    );

    expect(parsedParameters).toEqual({
      user: ['tjorven'],
      userId: ['747'],
    });
  });

  it('should handle multiple values for a key', function() {
    let parsedParameters = parseQueryParameters(
      `${baseUrl}?user=tjorven&user=boatsman`
    );

    expect(parsedParameters).toEqual({
      user: ['tjorven', 'boatsman'].sort(),
    });
  });
});
