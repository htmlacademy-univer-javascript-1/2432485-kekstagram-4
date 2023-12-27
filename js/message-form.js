import { documentOnKeydown } from './upload-form.js';

const messageError = document.querySelector('#error').content.querySelector('.error');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');

const onCloseErrorMessage = () => {
  const errorContainer = document.querySelector('.error');

  if (errorContainer) {
    errorContainer.remove();
    document.addEventListener('keydown', documentOnKeydown);
  }
};

const onErrorMouseClick = (evt) => {
  const errorContainer = document.querySelector('.success_button');
  if (evt.target !== errorContainer) {
    onCloseErrorMessage();
  }
};

const showErrorMessage = () => {
  const message = messageError.cloneNode(true);
  message.querySelector('.error__button').addEventListener('click', onCloseErrorMessage);

  document.addEventListener('keydown', onEscapeError);
  document.addEventListener('click', onErrorMouseClick);
  document.removeEventListener('keydown', documentOnKeydown);
  document.body.append(message);
};

function onEscapeError(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onCloseErrorMessage();
  }
}

const onCloseSuccessMessage = () => {
  document.removeEventListener('keydown', onEscapeSuccess);
  const successContainer = document.querySelector('.success');

  if (successContainer) {
    successContainer.remove();
  }
};

const onSuccessMouseClick = (evt) => {
  const successContainer = document.querySelector('.success__inner');
  if (evt.target !== successContainer) {
    onCloseSuccessMessage();
  }
};

const showSuccessMessage = () => {
  const message = messageSuccess.cloneNode(true);
  message.querySelector('.success__button').addEventListener('click', onCloseSuccessMessage);

  document.addEventListener('click', onSuccessMouseClick);
  document.addEventListener('keydown', onEscapeSuccess);

  document.body.append(message);
};

function onEscapeSuccess(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onCloseSuccessMessage();
  }
}

export { showErrorMessage, showSuccessMessage };
