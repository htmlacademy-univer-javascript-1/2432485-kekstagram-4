import {getPosts} from './data.js';
import { renderPictures } from './pictures.js';

const picturesArray = getPosts();
renderPictures(picturesArray);
