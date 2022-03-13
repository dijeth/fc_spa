import { DEFAULT_ADDRESS } from '../const';
import { getBaseAddress } from './common-utils';

const extractBrands = (brands, catalogBrands) => brands
  .map(({ brand, genders }) => {
    const catalogBrand = catalogBrands.find((it) => it.name === brand);

    return catalogBrand
      ? {
        genders,
        catalogBrand,
      }
      : null;
  })
  .filter((it) => !!it);

const flattenByGender = (lookBrands) => lookBrands.reduce((acc, { genders, catalogBrand }) => {
  const nameHasGender = genders.length > 1;

  return [
    ...acc,
    ...genders.map((gender) => ({
      nameHasGender,
      gender: gender || 0,
      catalogBrand,
    })),
  ];
}, []);

const formatAddress = (lookBrands) => lookBrands
  .map(({ nameHasGender, gender, catalogBrand: { name, addressList } }) => {
    const formattedSingleBrandAddressList = addressList
      .map((it) => getBaseAddress(it, gender))
      .filter((it) => !!it);

    return formattedSingleBrandAddressList.length
      ? {
        name,
        nameHasGender,
        gender,
        addressList: formattedSingleBrandAddressList,
        hasDefaultBrand: addressList.length !== formattedSingleBrandAddressList.length,
      }
      : null;
  })
  .filter((it) => !!it);

export const lookBrandsFormatter = (look, catalogBrands) => {
  const { id, brands } = look;
  let hasDefaultBrand = false;

  const lookBrands = extractBrands(brands, catalogBrands);
  hasDefaultBrand = hasDefaultBrand || lookBrands.length !== brands.length;

  const lookBrandsWithGender = flattenByGender(lookBrands);

  const lookBrandsWithPhone = formatAddress(lookBrandsWithGender);
  hasDefaultBrand = hasDefaultBrand || lookBrandsWithGender.length !== lookBrandsWithPhone.length;
  hasDefaultBrand = hasDefaultBrand || lookBrandsWithPhone.find((it) => it.hasDefaultBrand);

  return {
    id,
    brands: hasDefaultBrand ? [...lookBrandsWithPhone, DEFAULT_ADDRESS] : lookBrandsWithPhone,
  };
};
