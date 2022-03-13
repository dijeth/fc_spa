import { Gender, PhoneGender } from '../const';

export const getUrl = (...path) => `/${path.join('/')}`.replace('//', '/');

export const getImage = async (src) => new Promise((resolve) => {
  const image = new Image();

  image.addEventListener('load', () => {
    resolve(image);
  });

  image.src = src;
});

export const getImageSize = async (src) => getImage(src)
  .then(({ naturalWidth, naturalHeight }) => ({
    width: naturalWidth,
    height: naturalHeight,
  }));

const Domain = {
  TP: 'tretyakovsky.ru',
  K31: 'kutuzovsky31.ru',
  BLV: 'blv.ru',
};

export const getDomain = () => {
  const { location: { hostname } } = document;
  return hostname === 'localhost' ? Domain.BLV : hostname;
};

const getYandexMetric = (domain) => {
  switch (domain) {
    case Domain.TP:
    case Domain.K31:
    case Domain.BLV:
      return '<!-- Yandex.Metrika counter --> <script type="text/javascript" > (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(47898734, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }); </script> <noscript><div><img src="https://mc.yandex.ru/watch/47898734" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->';

    default: return '<!-- No Yandex Metrics on localhost -->';
  }
};

const getGoogleAnalitic = (domain) => {
  switch (domain) {
    case Domain.TP:
      return '<!-- Global site tag (gtag.js) - Google Analytics | Tretyak --><script async src="https://www.googletagmanager.com/gtag/js?id=UA-143366462-1"></script><script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}; gtag("js", new Date()); gtag("config", "UA-143366462-1");</script><!-- /Global site tag (gtag.js) - Google Analytics -->';

    case Domain.K31:
      return '<!-- Global site tag (gtag.js) - Google Analytics | Kutuz --><script async src="https://www.googletagmanager.com/gtag/js?id=UA-143332867-1"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments)}; gtag("js", new Date()); gtag("config", "UA-143332867-1");</script><!-- /Global site tag (gtag.js) - Google Analytics -->';

    case Domain.BLV:
      return '<!-- Global site tag (gtag.js) - Google Analytics | BLV --><script async src="https://www.googletagmanager.com/gtag/js?id=UA-25707356-1"></script><script>  window.dataLayer = window.dataLayer || [];  function gtag(){dataLayer.push(arguments)}; gtag("js", new Date());   gtag("config", "UA-25707356-1");</script><!-- /Global site tag (gtag.js) - Google Analytics -->';

    default:
      return '<!-- No Google Analitics on localhost -->';
  }
};

export const insertMetrics = () => {
  document.head.insertAdjacentHTML('beforeend', getGoogleAnalitic(getDomain()));
  document.body.insertAdjacentHTML('beforeend', getYandexMetric(getDomain()));
};

export const getBaseAddress = (fullBaseAddress, gender) => {
  const phone = fullBaseAddress[PhoneGender[gender || Gender.UNKNOWN]];

  return phone
    ? {
      text: fullBaseAddress.text,
      phone,
    }
    : null;
};

export const unique = (array, isSame = null) => {
  const callback = isSame || ((a, b) => a === b);

  return array.reduce((acc, cur) => (acc.findIndex((it) => callback(it, cur)) >= 0
    ? acc
    : [...acc, cur]), []);
};

export const pluck = (arrayOfObject, propertyName) => arrayOfObject.map((it) => it[propertyName]);
