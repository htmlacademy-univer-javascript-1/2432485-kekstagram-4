import {getPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const createPicture = document.querySelector('#picture').content;

const photos = getPhotos;

const fragment = document.createDocumentFragment();

photos.forEach(({likes, comments, description, url}) => {
  const pictureElement = createPicture.cloneNode(true);
  pictureElement.querySelector(".picture__likes").textContent=likes;
  pictureElement.querySelector(".picture__comments").textContent=comments.length;
  pictureElement.querySelector(".ppicture__img").alt=description;
  pictureElement.querySelector(".picture__img").scr=url;
  fragment.appendChild(pictureElement);
});

picturesContainer.appendChild(fragment);


