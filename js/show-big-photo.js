import { BigPhotoDetails } from './fill-big-photo-details.js';

const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const removeButton = bigPhoto.querySelector('.big-picture__cancel');
const pictures = document.querySelector('.pictures');

const hideBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', documentOnKeydown);
  removeButton.removeEventListener('click', hideBigPhoto);
};

const renderBigPhoto = () => {
  bigPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  removeButton.addEventListener('click', hideBigPhoto);
  document.addEventListener('keydown', documentOnKeydown);
};

function documentOnKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPhoto();
  }
}

const showBigPhoto = (photos) => {
  pictures.addEventListener('click', (evt) => {

    const clickedThumbnail = evt.target.closest('[data-id]');

    if (!clickedThumbnail) {
      return;
    }
    evt.preventDefault();

    const currentPhoto = photos.find((item) => item.id === +clickedThumbnail.dataset.id);
    renderBigPhoto();
    BigPhotoDetails(currentPhoto);
  });
};

export { showBigPhoto };
