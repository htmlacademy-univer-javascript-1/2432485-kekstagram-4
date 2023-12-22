import {setComments} from './comments.js';
import {pressEscape} from './util.js';

const bigPicture = document.querySelector('.big-picture');

// Получаем ссылку на кнопку закрытия большого изображения
const closeButton = bigPicture.querySelector('#picture-cancel');

const clearBigPictureMenu = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const onEscapeKeyDown = (evt) => {
  if(pressEscape(evt)){
    clearBigPictureMenu();

    document.removeEventListener('keydown', onEscapeKeyDown);
  }
};

closeButton.addEventListener('click', () => {
  clearBigPictureMenu();

  document.removeEventListener('keydown', onEscapeKeyDown);
});

const showBigPicture = (data) => {
  document.addEventListener('keydown', onEscapeKeyDown);

  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.description;

  setComments(data.comments);

  document.querySelector('body').classList.add('modal-open');
};

export {showBigPicture};
