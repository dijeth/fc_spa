import { ContentType } from '../const/catalog-const';

const formatCostValue = (value) => {
  const cost = /\u00A0$/.test(value) ? value : `${value}\u00A0`;

  return /\d\d\d\d\u00A0/.test(cost)
    ? formatCostValue(cost.replace(/(\d)(\d\d\d)\u00A0/, '$1\u00A0$2\u00A0'))
    : cost;
};

export const formatCost = (cost) => {
  if (!cost) { return ''; }

  const value = String(cost).replace(/\D/g, '');

  return `${formatCostValue(value)}₽`;
};

export const getBrandRegExp = (brands) => {
  const preparedBrands = brands.map((it) => it.replace(/[^\sa-z0-9]/ig, '.').replace(/\s/, '\\s'));
  return RegExp(`((${preparedBrands.join(')|(')}))`, 'gi');
};

export const splitContent = (text, brandRegExp) => {
  if (/Эксклюзивно/.test(text)) {
    return [{
      content: text,
      style: ContentType.EXCLUSIVE,
    }];
  }

  const matches = [];

  return text
    .replace(brandRegExp, (match) => {
      matches.push({ content: match, style: ContentType.BRAND });
      return `###<${matches.length - 1}>###`;
    })
    .replace(/на.+?модели.+?:/ig, (match) => {
      matches.push({ content: match, style: ContentType.MODEL });
      return `###<${matches.length - 1}>###`;
    })
    .replace(/\(.+?\)/g, (match) => {
      matches.push({ content: match, style: ContentType.BRACKET });
      return `###<${matches.length - 1}>###`;
    })
    .split('###')
    .filter((it) => !!it)
    .map((it) => {
      if (!/<\d+?>/.test(it)) {
        return { content: it, style: ContentType.TEXT };
      }

      const index = Number(it.slice(1, -1));

      if (!matches[index]) {
        return { content: it, style: ContentType.TEXT };
      }

      return matches[index];
    });
};
