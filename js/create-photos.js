
import { getRandomInteger, getId, createRandomIdFromRangeGenerator, throttle } from './utils.js';

const NAMES = [
  'Андрей',
  'Иван',
  'Павел',
  'Валентина',
  'Екатерина',
  'Татьяна'
];
const MESSAGES = [
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


const CommentsCount = {
  MIN: 0,
  MAX: 30,
};
const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const MessagesCount = {
  MIN: 1,
  MAX: 2,
};
const AvatarId = {
  MIN: 1,
  MAX: 6,
};
const COUNT_PHOTOS = 25;

const generatePhotoID = createRandomIdFromRangeGenerator(1, COUNT_PHOTOS);

const generateCommentID = getId();

const getComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInteger(AvatarId.MIN, AvatarId.MAX)}.svg`,
  message: throttle(MESSAGES).slice(0, getRandomInteger(MessagesCount.MIN, MessagesCount.MAX)),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const getPhotoData = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  likes: getRandomInteger(LikesCount.MIN, LikesCount.MAX),
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  comments: Array.from({ length: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX) }, () => getComment(generateCommentID())),
});

const getPhotos = () => Array.from({ length: COUNT_PHOTOS }, () => getPhotoData(generatePhotoID()));

export { getPhotos };
