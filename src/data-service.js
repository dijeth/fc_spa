import { API_URL } from './const';

const getData = (path) => fetch(`${API_URL}/${path}`)
  .then((response) => response.json());

export {
  getData,
};
