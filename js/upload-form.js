import { setupHashtagInput, clearHashtagsField, checkFormValidation} from './hashtag.js';
import { pressEscape } from './util.js';
import { setInitialScale} from './scaler.js';
import { setEffects } from './effects.js';
import {setData} from './connect-server.js';
import {addPostMessages, showSuccessMessage, closeMessage, showErrorMessage} from './post-message.js';

const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const closeUploadButton = document.querySelector('#upload-cancel');

// Получаем ссылки на элементы формы загрузки
const commentsTextArea = overlayElement.querySelector('.text__description');
const submitButton = overlayElement.querySelector('#upload-submit');

// Функция для очистки формы после загрузки
const clearUploadForm = () => {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  fileInput.value = '';
  clearHashtagsField();
  commentsTextArea.value = '';
  closeMessage();

  submitButton.disabled = false;
};

// Обработчик нажатия клавиши Escape
const onEscapeKeyDown = (evt) => {
  // Проверяем, что нажата клавиша Escape и не происходит ввод в полях ввода
  if (pressEscape(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    // Очищаем форму
    clearUploadForm();

    document.removeEventListener('keydown', onEscapeKeyDown);
  }
};

// Добавляем обработчик события для кнопки закрытия
closeUploadButton.addEventListener('click', () => {
  // Очищаем форму
  clearUploadForm();

  document.removeEventListener('keydown', onEscapeKeyDown);
});

// Обработчик события при клике на кнопку загрузки
const onUploadClick = () => {
  // Добавляем обработчик для события нажатия клавиши Escape
  document.addEventListener('keydown', onEscapeKeyDown);

  // Показываем оверлей
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Устанавливаем начальные значения масштаба и эффектов
  setInitialScale();
  setEffects();

  // Добавляем обработчик для ввода хэштегов
  setupHashtagInput();
};

// Добавляем обработчик события для поля выбора файла
const uploadForm = () => {
  fileInput.addEventListener('change', onUploadClick);
  addPostMessages();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if(checkFormValidation()) {
    setData(showSuccessMessage, showErrorMessage, 'POST', new FormData(form));
  }
};

form.addEventListener('submit', onFormSubmit);

// Экспортируем функцию установки формы загрузки
export { uploadForm, closeUploadButton, onEscapeKeyDown};
