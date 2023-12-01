import { handlePictureClick } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const createPicture = document.querySelector('#picture').content;
const picturesFragment = document.createDocumentFragment();

const renderPicture = (picture) => {

  const pictureElement = createPicture.cloneNode(true);
  pictureElement.querySelector(".picture__likes").textContent=likes;
  pictureElement.querySelector(".picture__comments").textContent=comments.length;
  pictureElement.querySelector(".ppicture__img").alt=description;
  pictureElement.querySelector(".picture__img").scr=url;

  handlePictureClick(pictureElement, picture);

  return pictureElement;
};

const renderPictures = (images) => {
  images.forEach((picture) => {
    picturesFragment.appendChild(renderPicture(picture));
  });

  picturesContainer.appendChild(picturesFragment);
};

export { renderPictures };


