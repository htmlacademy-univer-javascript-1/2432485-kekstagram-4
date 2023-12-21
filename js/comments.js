// Задаем максимальное количество новых комментариев для загрузки
const MAX_NEW_COMMENTS = 5;

// Получаем элементы интерфейса
const imageContainer = document.querySelector('.big-picture');
const loadMoreButton = imageContainer.querySelector('.comments-loader');
const commentCountPicture = imageContainer.querySelector('.social__comment-count');
const commentsContainer = imageContainer.querySelector('.social__comments');
const commentTemplate = commentsContainer.children[0].cloneNode(true);

// Инициализируем счетчик комментариев
let commentsMultiplier = 1;

// Функция для создания элемента комментария на основе шаблона
const createCommentElement = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImage = commentElement.querySelector('.social__picture');

  // Заполняем данные комментария
  commentImage.src = commentData.avatar;
  commentImage.alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  // Скрываем комментарий по умолчанию
  commentElement.classList.add('hidden');

  return commentElement;
};

// Функция для добавления новых комментариев
const addNewComments = () => {
  const newCommentsCount = MAX_NEW_COMMENTS * commentsMultiplier;
  const totalCommentsCount = commentsContainer.children.length;
  const addedCommentsCount = Math.min(newCommentsCount, totalCommentsCount);

  // Показываем добавленные комментарии
  for (let i = 0; i < addedCommentsCount; i++) {
    if (i < newCommentsCount && i >= newCommentsCount - MAX_NEW_COMMENTS) {
      commentCountPicture.children[i].classList.remove('hidden');
    }
  }

  // Показываем или скрываем кнопку загрузки в зависимости от количества комментариев
  loadMoreButton.classList.toggle('hidden', totalCommentsCount <= newCommentsCount);

  // Обновляем отображение количества комментариев
  commentCountPicture.innerHTML = `${addedCommentsCount} из <span class="comments-count">${totalCommentsCount}</span> комментариев`;
};

// Функция для установки комментариев на изображение
const setComments = (commentsData) => {
  commentsContainer.innerHTML = '';

  // Создаем и добавляем элементы комментариев
  commentsData.forEach((commentData) => {
    commentsContainer.appendChild(createCommentElement(commentData));
  });
  // Сбрасываем счетчик и отображаем начальное количество комментариев
  commentsMultiplier = 1;
  addNewComments();
};

// Обработчик события для кнопки загрузки комментариев
loadMoreButton.addEventListener('click', () => {
  commentsMultiplier++;
  addNewComments();
});

// Экспортируем функцию установки комментариев
export {setComments};
