const SCALE_STEP = 25;
const MIN_SCALER_VALUE = 25;
const MAX_SCALER_VALUE = 100;

const uploadingOverlay = document.querySelector('.img-upload__overlay');
const uploadingPicture = uploadingOverlay.querySelector('.img-upload__preview').querySelector('img');
const scale = uploadingOverlay.querySelector('.img-upload__scale');
const scalerField = scale.querySelector('.scale__control--value');

const changeScale = (scaleCoefficient) => {
  let scaleNumber = Number(scalerField.value.replace('%', '')) + scaleCoefficient * SCALE_STEP;

  if(scaleNumber < MIN_SCALER_VALUE) {
    scaleNumber = MIN_SCALER_VALUE;
  }
  else if (scaleNumber > MAX_SCALER_VALUE) {
    scaleNumber = MAX_SCALER_VALUE;
  }

  scalerField.value = `${scaleNumber}%`;
  uploadingPicture.style.transform = `scale(${scaleNumber / 100})`;
};

const onScaleButtonClick = (evt) => {
  if(evt.target.matches('button')) {
    let coefficient = 1;
    if(evt.target.matches('.scale__control--smaller')) {
      coefficient = -1;
    }

    changeScale(coefficient);
  }
};

const setScale = () => {
  scalerField.value = `${MAX_SCALER_VALUE}%`;
  uploadingPicture.style.transform = `scale(${MAX_SCALER_VALUE / 100})`;
};

scale.addEventListener('click', onScaleButtonClick);

export{setScale};
