import {getPosts} from './data.js';
import { renderPictures } from './pictures.js';
import {uploadForm} from './upload-form.js';

const picturesArray = getPosts();
renderPictures(picturesArray);

uploadForm();
