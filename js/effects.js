import { Effects } from './constants.js';

const modal = document.querySelector('.img-upload');

const imageUpload = modal.querySelector('.img-upload__preview img');
const slider = modal.querySelector('.img-upload__effect-level');

const effects = modal.querySelector('.effects');
const effectLevelSlider = modal.querySelector('.effect-level__slider');
const effectLevelValue = modal.querySelector('.effect-level__value');

let chosenEffect = Effects.NONE;

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions(
    {
      range: {
        min: chosenEffect.min,
        max: chosenEffect.max
      },
      step: chosenEffect.step,
      start: chosenEffect.max
    });

  if (chosenEffect === Effects.NONE) {
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  chosenEffect = Effects[`${evt.target.value}`.toUpperCase()];
  imageUpload.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onUpdateSlider = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();

  if (chosenEffect === Effects.NONE) {
    imageUpload.style.filter = Effects.NONE.style;
    slider.classList.add('hidden');
  }
  else {
    imageUpload.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }

  effectLevelValue.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = Effects.NONE;
  updateSlider();
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: Effects.NONE.min,
    max: Effects.NONE.max
  },
  start: Effects.NONE.max,
  step: Effects.NONE.step,
  connect: 'lower'
});

effects.addEventListener('change', onEffectsChange);
effectLevelSlider.noUiSlider.on('update', onUpdateSlider);

export { resetEffects };
