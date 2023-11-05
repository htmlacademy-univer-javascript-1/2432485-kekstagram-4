import {getRandomInteger, getUniqNumber} from './util.js';

const URL = [];
const PHOTOS = [];
const COMMENTS = [];
const MINIMUM_NUMBER_OF_COMMENTS = 1;
const MAXIMUM_NUMBER_OF_COMMENTS = 30;
const MINIMUM_NUMBER_OF_LIKES = 15;
const MAXIMUM_NUMBER_OF_LIKES = 200;
const NUMBER_OF_POSTS = 25;

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

const getComments = () => {
  const comments = [];
  const numberOfComments = getRandomInteger(MINIMUM_NUMBER_OF_COMMENTS, MAXIMUM_NUMBER_OF_COMMENTS);
  for (let i=0; i < numberOfComments; i++){
    comments.push({
      id: getUniqNumber(1, 100000, COMMENTS),
      avatar:`img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: MESSAGE[getRandomInteger(0, 5)],
      name: NAMES[getRandomInteger(0, 5)]
    });
  }
  return comments;
};

const getPost= () => ({
  id: getUniqNumber(1, 25, PHOTOS),
  url: `photos/${getUniqNumber(1, 25, URL)}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, 4)],
  likes: getRandomInteger(MINIMUM_NUMBER_OF_LIKES, MAXIMUM_NUMBER_OF_LIKES),
  comments: getComments()
});

const getPosts = () => {
  Array.from({length: NUMBER_OF_POSTS}, getPost);
};

export {getPosts};
