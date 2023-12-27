
import { TAG_MAX_COUNT, VALID_CHARS, ERROR_MESSAGE, FILE_TYPES } from './constants.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');

const imageOverlay = uploadForm.querySelector('.img-upload__overlay');
const buttonCloseOverlay = uploadForm.querySelector('#upload-cancel');

const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentsField = uploadForm.querySelector('.text__description');

const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const filterImagesPreview = uploadForm.querySelector('.effects__preview');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getSplitTags = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);

const areCharsValid = (value) => getSplitTags(value).every((tag) => VALID_CHARS.test(tag));

const hasReachedHashtagLimit = (value) => getSplitTags(value).length <= TAG_MAX_COUNT;

const areTagsUnique = (value) => {
  const lowerCaseTags = getSplitTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagsField,
  areCharsValid,
  ERROR_MESSAGE.NOT_VALID,
  1,
  true
);

pristine.addValidator(
  hashtagsField,
  hasReachedHashtagLimit,
  ERROR_MESSAGE.REACHED_MAX_COUNT,
  2,
  true
);

pristine.addValidator(
  hashtagsField,
  areTagsUnique,
  ERROR_MESSAGE.NOT_UNIQUE,
  3,
  true
);

const reset = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
};

const hideImageModal = () => {
  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  reset();
  buttonCloseOverlay.removeEventListener('click', hideImageModal);
};

const documentOnKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideImageModal();
    document.removeEventListener('keydown', documentOnKeydown);
  }
};

const showImageModal = () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  buttonCloseOverlay.addEventListener('click', hideImageModal);
  document.addEventListener('keydown', documentOnKeydown);
};

commentsField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

hashtagsField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const SubmitBtnText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  buttonCloseOverlay.disabled = true;
  buttonCloseOverlay.textContent = SubmitBtnText.SENDING;
};

const unblockSubmitButton = () => {
  buttonCloseOverlay.disabled = false;
  buttonCloseOverlay.textContent = SubmitBtnText.IDLE;
};

const onFormSubmit = (callback) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      await callback(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

const changeEffectPreviewImage = (loadedImage) => {
  filterImagesPreview.forEach((preview) => {
    preview.style.backgroundImage = `url('${loadedImage}')`;
  });
};

const showPreviewImage = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (file && matches) {
    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;
    changeEffectPreviewImage(imageUrl);
  }
};

const onChangeUpload = () => {
  showImageModal();
  showPreviewImage();
};

uploadFile.addEventListener('change', onChangeUpload);

export { onFormSubmit, hideImageModal, documentOnKeydown };
