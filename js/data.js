import {getRandomInteger, getUniqNumber, generateArray} from './util.js';

const COUNT_PHOTO = 25;
const COUNT_COMMENT = 10;
const photosId = generateArray(25,25);
const usersId = generateArray(25,25);

const NAMES = [
  'Андрей',
  'Иван',
  'Павел',
  'Валентина',
  'Екатерина',
  'Татьяна'
];
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Тут могла быть ваша реклама.',
  'Если я в чем то сомневаюсь, я возвращаюсь к началу.',
  'Это ведь так весело, правда? Правила нарушать.',
  'Я личность! Понятно? Бесформенная, но личность!',
  'Ну это уж совсем не доказательство…'
];

const getComments = () => ({
  id: getUniqNumber(usersId),
  avatar:`img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: MESSAGE[getRandomInteger(0, 5)],
  name: NAMES[getRandomInteger(0, 5)]
});
const getPhoto= () => ({
  id: photosId[getRandomInteger(1,COUNT_PHOTO-1)],
  url: `photos/${getRandomInteger(1,COUNT_PHOTO-1)}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length-1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, COUNT_COMMENT) },getComments)
});

const getPosts = () => {
  Array.from({length: COUNT_PHOTO}, getPhoto);
};

export {getPosts};
