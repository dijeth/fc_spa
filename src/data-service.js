import { API_URL, ErrorMessage } from './const';

const getData = (path) => fetch(`${API_URL}/${path}`)
  .then((response) => {
    if (response.status >= 500) {
      throw new Error(ErrorMessage.SERVER_ERROR);
    }

    if (response.status >= 400) {
      throw new Error(ErrorMessage.NOT_FOUND);
    }

    return response.json();
  });

export {
  getData,
};
