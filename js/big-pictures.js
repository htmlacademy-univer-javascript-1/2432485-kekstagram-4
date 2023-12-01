const fullPictureContainer = document.querySelector('.big-picture');
const pictureCommentsContainer = fullPictureContainer.querySelector('.social__comments');
const commentTemplate = pictureCommentsContainer.children[0];
const closeButton = fullPictureContainer.querySelector('#picture-cancel');

const createCommentElement = (comment) => {
  const newCommentElement = commentTemplate.cloneNode(true);
  const newCommentImg = newCommentElement.querySelector('.social__picture');

  newCommentImg.src = comment.avatar;
  newCommentImg.alt = comment.name;
  newCommentElement.querySelector('.social__text').textContent = comment.message;

  return newCommentElement;
};

const handlePictureClick = (thumbnail, imageData) => {
  thumbnail.addEventListener('click', () => {
    fullPictureContainer.classList.remove('hidden');

    fullPictureContainer.querySelector('.big-picture__img img').src = imageData.url;
    fullPictureContainer.querySelector('.likes-count').textContent = imageData.likes;
    fullPictureContainer.querySelector('.comments-count').textContent = imageData.comments.length;
    fullPictureContainer.querySelector('.social__caption').textContent = imageData.description;

    pictureCommentsContainer.innerHTML = '';
    imageData.comments.forEach((comment) => {
      pictureCommentsContainer.appendChild(createCommentElement(comment));
    });

    fullPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
    fullPictureContainer.querySelector('.comments-loader').classList.add('hidden');

    document.body.classList.add('modal-open');
  });
};

const handleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    fullPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  document.removeEventListener('keydown', handleEscapeKey);
};

closeButton.addEventListener('click', () => {
  fullPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscapeKey);
});

document.addEventListener('keydown', handleEscapeKey);

export { handlePictureClick };
