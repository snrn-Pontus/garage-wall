const parseQueryParameters = (url: string) => {
  let urlSearchParams = new URLSearchParams(new URL(url).searchParams);

  const queryParameters: { [key: string]: string[] } = {};

  urlSearchParams.sort();
  urlSearchParams.forEach((value, key) => {
    queryParameters[key] = [value, ...(queryParameters[key] || [])];
  });

  return queryParameters;
};

export { parseQueryParameters };
