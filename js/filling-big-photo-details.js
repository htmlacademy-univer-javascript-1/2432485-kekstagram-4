import { COMMENTS_LOAD_COUNT } from './constants.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');

const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');

const commentTemplate = document.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');

let shownCommentsCount = COMMENTS_LOAD_COUNT;

let currentPhoto;

const getNewComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const changeCommentCount = (currentShownCommentsCount, pictureCommentsCount) => {
  socialCommentsCount.textContent = `${currentShownCommentsCount} из ${pictureCommentsCount} комментариев`;
};

const showComments = (comments) => {
  commentsList.innerHTML = '';

  commentsLoader.classList.remove('hidden');

  const fragment = document.createDocumentFragment();
  const slicedComments = comments.slice(0, shownCommentsCount);

  for (const comment of slicedComments) {
    fragment.append(getNewComment(comment));
  }


  if (shownCommentsCount >= comments.length) {
    shownCommentsCount = comments.length;
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', commentsLoaderOnClick);
  }
  changeCommentCount(shownCommentsCount, comments.length);
  commentsList.append(fragment);
};
function commentsLoaderOnClick() {
  shownCommentsCount += COMMENTS_LOAD_COUNT;
  showComments(currentPhoto.comments);
}

const fillBigPhotoDetails = (clickedPhoto) => {
  currentPhoto = clickedPhoto;

  bigPictureImg.src = clickedPhoto.url;
  bigPictureLikesCount.textContent = clickedPhoto.likes;
  commentsCount.textContent = clickedPhoto.comments.length;
  bigPictureSocialCaption.textContent = clickedPhoto.description;

  commentsLoader.addEventListener('click', commentsLoaderOnClick);

  shownCommentsCount = COMMENTS_LOAD_COUNT;

  showComments(clickedPhoto.comments);
};

export { fillBigPhotoDetails };
