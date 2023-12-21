import { setupHashtagInput, clearHashtagsField } from './hashtag.js';
import { pressEscape } from './util.js';
import { setInitialScale} from './scaler.js';
import { setEffects } from './effects.js';

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
};

// Экспортируем функцию установки формы загрузки
export { uploadForm };
