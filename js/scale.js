import { SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE } from './constants.js';

const modal = document.querySelector('.img-upload');
const scaleInput = modal.querySelector('.scale__control--value');

const makeImageSmallerBtn = modal.querySelector('.scale__control--smaller');
const makeImageBiggerButton = modal.querySelector('.scale__control--bigger');
const imagePreview = modal.querySelector('.img-upload__preview img');


const scalePhoto = (value) => {
  scaleInput.value = `${value}%`;

  imagePreview.style.transform = `scale(${value / 100})`;
};

const makePhotoSmaller = () => {
  const currentValue = Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE);
  scalePhoto(currentValue);
};

const makePhotoBigger = () => {
  const currentValue = Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE);
  scalePhoto(currentValue);
};

const resetScale = () => {
  scalePhoto(DEFAULT_SCALE);
};

resetScale();

makeImageBiggerButton.addEventListener('click', makePhotoBigger);
makeImageSmallerBtn.addEventListener('click', makePhotoSmaller);

export { resetScale };
