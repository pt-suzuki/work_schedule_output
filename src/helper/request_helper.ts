export const parseQueryString = (
  query: string
): { [index: string]: string } => {
  const arrQuery = query.split('&');
  const result: { [key: string]: string } = {};
  arrQuery.map((item) => {
    const keyValue = item.split('=');
    if (keyValue.length !== 2) return;
    result[keyValue[0]] = keyValue[1];
  });

  return result;
};

export const getApiType = (query: string): string => {
  const params = parseQueryString(query);
  return params['apiType'];
};
