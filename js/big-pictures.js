const fullPictureContainer = document.querySelector('.big-picture');
const pictureCommentsContainer = fullPictureContainer.querySelector('.social__comments');
const commentTemplate = pictureCommentsContainer.children[0];
const closeButton = fullPictureContainer.querySelector('#picture-cancel');
const commentCount = fullPictureContainer.querySelector('.social__comment-count');
const commentsLoader = fullPictureContainer.querySelector('.comments-loader');

let displayedComments = 5;

const createCommentElement = (comment) => {
  const newCommentElement = commentTemplate.cloneNode(true);
  const newCommentImg = newCommentElement.querySelector('.social__picture');

  newCommentImg.src = comment.avatar;
  newCommentImg.alt = comment.name;
  newCommentElement.querySelector('.social__text').textContent = comment.message;

  return newCommentElement;
};

const renderComments = (comments) => {
  pictureCommentsContainer.innerHTML = '';

  comments.slice(0, displayedComments).forEach((comment) => {
    pictureCommentsContainer.appendChild(createCommentElement(comment));
  });
  commentCount.textContent = `${displayedComments} из ${comments.length} комментариев`;
};

const handleLoadMoreComments = () => {
  displayedComments += 5;

  renderComments(imageData.comments);

  if (displayedComments >= imageData.comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const handlePictureClick = (thumbnail, imageData) => {
  thumbnail.addEventListener('click', () => {
    fullPictureContainer.classList.remove('hidden');

    fullPictureContainer.querySelector('.big-picture__img img').src = imageData.url;
    fullPictureContainer.querySelector('.likes-count').textContent = imageData.likes;
    fullPictureContainer.querySelector('.comments-count').textContent = imageData.comments.length;
    fullPictureContainer.querySelector('.social__caption').textContent = imageData.description;


    commentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    renderComments(imageData.comments);

    fullPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
    document.body.classList.add('modal-open');
  });
};

const handleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    fullPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscapeKey);
  }
};

closeButton.addEventListener('click', () => {
  fullPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscapeKey);
});

commentsLoader.addEventListener('click', handleLoadMoreComments);

document.addEventListener('keydown', handleEscapeKey);

export { handlePictureClick };
