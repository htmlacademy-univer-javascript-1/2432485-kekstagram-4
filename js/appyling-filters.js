import { Filters, PICTURES_COUNT } from './constants.js';
import { renderPhotos } from './render-miniature.js';
import { debounce } from './utils.js';

const filterFormElement = document.querySelector('.img-filters');
let currentFilter = Filters.DEFAULT;
let photos = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length;

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case Filters.RANDOM:
      return [...photos].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filters.DISCUSSED:
      return [...photos].sort(sortByComments);
    default:
      return [...photos];
  }
};

const onFilterClick = (callback) => {
  filterFormElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    currentFilter = clickedButton.id;

    const currentActiveFilter =
      filterFormElement.querySelector('.img-filters__button--active');
    currentActiveFilter.classList.remove('img-filters__button--active');

    clickedButton.classList.add('img-filters__button--active');
    callback(getFilteredPhotos());
  });
};

const showFilters = (loadedPhotos) => {
  filterFormElement.classList.remove('img-filters--inactive');
  photos = [...loadedPhotos];

  const debouncedRender = debounce((newPhotos) => {
    renderPhotos(newPhotos);
  });

  onFilterClick(debouncedRender);
};

export { showFilters };
