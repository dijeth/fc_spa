import { MOCK_TIMEOUT } from '../const';
import { brands } from '../mock-data/brands';

class BrandService {
  constructor() {
    this.brands = brands;
  }

  async getBrands() {
    return new Promise((res) => {
      setTimeout(() => {
        res(this.brands);
      }, Math.random() * MOCK_TIMEOUT);
    });
  }
}

const brandService = new BrandService();

export { brandService };
