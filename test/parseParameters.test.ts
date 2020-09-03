import { parseParameters } from '../src/mock/utils/parseParameters';

describe('parseParameters', () => {
  const baseUrl = 'http://localhost:1234';

  it('should match string', () => {
    const routeParams = {
      '{string}': '\\w+',
    };

    const urlPattern = `${baseUrl}/{string}/`;

    let parsedParameters = parseParameters(
      routeParams,
      urlPattern,
      `${baseUrl}/tjorven/`
    );

    expect(parsedParameters).toEqual({
      string: 'tjorven',
    });
  });

  it('should match numbers', () => {
    const routeParams = {
      '{numbers}': '\\d+',
    };

    const urlPattern = `${baseUrl}/{numbers}/`;

    let parsedParameters = parseParameters(
      routeParams,
      urlPattern,
      `${baseUrl}/747/`
    );

    expect(parsedParameters).toEqual({
      numbers: '747',
    });
  });

  it('should match numbers', () => {
    const routeParams = {
      '{numbersOrString}': '\\d+|\\w+',
    };

    const urlPattern = `${baseUrl}/{numbersOrString}/`;

    let parsedParameters = parseParameters(
      routeParams,
      urlPattern,
      `${baseUrl}/tjorven747/`
    );

    expect(parsedParameters).toEqual({
      numbersOrString: 'tjorven747',
    });
  });

  it('should match oneOf', () => {
    const routeParams = {
      '{oneOf}': 'a|b|c',
    };

    const urlPattern = `${baseUrl}/{oneOf}/`;

    let parsedParameters = parseParameters(
      routeParams,
      urlPattern,
      `${baseUrl}/a/`
    );

    expect(parsedParameters).toEqual({
      oneOf: 'a',
    });
  });

  it('should match multiple parameters', () => {
    const routeParams = {
      '{oneOf}': 'a|b|c',
      '{numbers}': '\\d+',
      '{string}': '\\w+',
      '{numbersOrString}': '\\d+|\\w+',
    };

    const urlPattern =
      'http://localhost:1234/{oneOf}/{numbers}/{string}/{numbersOrString}/';

    let parsedParameters = parseParameters(
      routeParams,
      urlPattern,
      'http://localhost:1234/a/1/z/1a/'
    );

    expect(parsedParameters).toEqual({
      oneOf: 'a',
      numbers: '1',
      string: 'z',
      numbersOrString: '1a',
    });
  });
});
