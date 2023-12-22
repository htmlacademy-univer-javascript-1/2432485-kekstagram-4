import { setComments } from './comment.js';
import { pressEscape } from './util.js';

const bigPicture = document.querySelector('.big-picture');

// Получаем ссылку на кнопку закрытия большого изображения
const closeButton = bigPicture.querySelector('#picture-cancel');

// Функция для скрытия большого изображения и восстановления обычного состояния страницы
const clearBigPictureMenu = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

// Функция-обработчик для события нажатия клавиши Escape
const onEscapeKeyDown = (evt) => {
  if (pressEscape(evt)) {
    clearBigPictureMenu();
    document.removeEventListener('keydown', onEscapeKeyDown);
  }
};

// Обработчик события для кнопки закрытия большого изображения
closeButton.addEventListener('click', () => {
  clearBigPictureMenu();
  document.removeEventListener('keydown', onEscapeKeyDown);
});

// Функция для добавления события открытия большого изображения к маленькому изображению
const pictureClick = (data) => {
  document.addEventListener('keydown', onEscapeKeyDown);


  // Показываем большое изображение
  bigPicture.classList.remove('hidden');

  // Заполняем информацию в большом изображении
  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.description;

  // Устанавливаем комментарии
  setComments(data.comments);

  // Добавляем класс для запрета прокрутки страницы при открытом модальном окне
  document.querySelector('body').classList.add('modal-open');

};

// Экспортируем функцию добавления события открытия большого изображения
export { pictureClick };
