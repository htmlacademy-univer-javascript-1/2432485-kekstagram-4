import { renderPhotos } from './render-miniature.js';
import { getData, sendData } from './api.js';
import { onFormSubmit, hideImageModal } from './upload-form.js';
import { showErrorMessage, showSuccessMessage } from './message-form.js';
import { showFilters } from './applying-filters.js';

getData().then((data) => {
  renderPhotos(data);
  showFilters(data);
});

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideImageModal();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage();
  }
});
