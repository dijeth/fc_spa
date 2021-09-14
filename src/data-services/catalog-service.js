import { data } from '../mock-data/data';

const MOCK_TIMEOUT = 100;

class CatalogService {
  constructor() {
    this.data = data;
  }

  getCatalog(category, catalogName) {
    return new Promise((res, rej) => {
      if (category === 'please-set-error') {
        setTimeout(() => { rej(new Error('some server error')); }, Math.random() * MOCK_TIMEOUT);
      } else {
        setTimeout(() => { res(this.data.find((it) => it.brandLink === category && it.link.toLowerCase() === catalogName)); }, Math.random() * MOCK_TIMEOUT);
      }
    });
  }
}

export { CatalogService };
