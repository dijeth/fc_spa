export const PRELOADED_SLIDES_COUNT = 8;

export const ImageFolder = {
  THRUMBNAIL: 'thrumbnails',
  LOOK: 'looks',
  ZOOM: 'zoom',
};

export const ContentType = {
  EXCLUSIVE: 'exclusive',
  MODEL: 'model',
  BRAND: 'brand',
  BRACKET: 'bracket',
  TEXT: 'text',
};

export const Gender = {
  WOMAN: 1,
  MAN: 2,
  CHILD: 3,
  UNKNOWN: 0,
};

export const PhoneGender = {
  [Gender.WOMAN]: 'phoneWoman',
  [Gender.MAN]: 'phoneMan',
  [Gender.CHILD]: 'phoneChild',
  [Gender.UNKNOWN]: 'phone',
};

export const GenderName = {
  [Gender.WOMAN]: 'женщины',
  [Gender.MAN]: 'мужчины',
  [Gender.CHILD]: 'дети',
  [Gender.UNKNOWN]: 'общий',
};

export const DEFAULT_ADDRESS = {
  name: '',
  nameHasGender: false,
  gender: Gender.UNKNOWN,
  addressList: [
    {
      text: 'Отдел обслуживания клиентов',
      phone: '+74952258889',
    },
  ],
};
