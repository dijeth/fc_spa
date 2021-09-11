const getUrl = (...path) => `${ROOT_ROUTE}${path.join('/')}`.replace('//', '/');

export {
  getUrl,
};
