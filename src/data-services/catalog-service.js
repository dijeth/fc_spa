import { MOCK_TIMEOUT } from '../const';
import { data } from '../mock-data/data';
import { getUrl } from '../utils';

class CatalogService {
  constructor() {
    this.data = data;
  }

  async load(process) {
    return new Promise((res) => {
      setTimeout(() => {
        res(process(this.data));
      }, Math.random() * MOCK_TIMEOUT);
    });
  }

  async getCatalog(category, catalogName) {
    return this.load(() => this.data.find((it) => it.brandLink === category && it.link.toLowerCase() === catalogName));
  }

  async getCatalogs() {
    return this.load(() => this.data.map((catalog) => {
      const {
        id, brand, title, link, brandLink,
      } = catalog;

      return {
        id,
        brand,
        title,
        link: getUrl(brandLink, link),
      };
    }));
  }
}

const catalogService = new CatalogService();

export { catalogService };
