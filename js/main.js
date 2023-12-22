import {getData} from './api.js';
import { renderPictures } from './pictures.js';
import {uploadForm} from './upload-form.js';

getData((pictures) => {
  renderPictures(pictures);
});

uploadForm();
