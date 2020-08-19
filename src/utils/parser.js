import querystring from 'querystring';

export function queryFromSearch(search) {
  if (!search) {
    return {};
  }

  const qstr = search.replace('?', '');

  return querystring.parse(qstr);
}

export function searchFromQuery(query) {
  if (!query) {
    return '';
  }

  const qstr = querystring.stringify(query);

  return `?${qstr}`;
}

export default {
  queryFromSearch,
  searchFromQuery,
};
