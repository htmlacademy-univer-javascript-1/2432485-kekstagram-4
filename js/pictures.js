import { pictureClick } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const createPicture = document.querySelector('#picture').content;
const picturesFragment = document.createDocumentFragment();

const renderPicture = (picture) => {

  const pictureElement = createPicture.cloneNode(true);
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__img').alt=picture.description;
  pictureElement.querySelector('.picture__img').src = picture.url;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    pictureClick(picture);
  });

  return pictureElement;
};

const renderPictures = (images) => {
  images.forEach((picture) => {
    picturesFragment.appendChild(renderPicture(picture));
  });

  picturesContainer.appendChild(picturesFragment);
};

export { renderPictures };
