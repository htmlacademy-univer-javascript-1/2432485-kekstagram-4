const SCALE_STEP = 25;

// Минимальное и максимальное значение масштаба
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

// Получаем ссылки на элементы DOM
const overlayElement = document.querySelector('.img-upload__overlay');
const pictureElement = overlayElement.querySelector('.img-upload__preview img');
const scaleElement = overlayElement.querySelector('.img-upload__scale');
const scalerValueElement = scaleElement.querySelector('.scale__control--value');

// Функция для изменения масштаба изображения
const changeScale = (scaleCoefficient) => {
  let currentScale = Number(scalerValueElement.value.replace('%', '')) + scaleCoefficient * SCALE_STEP;

  // Проверка на минимальное и максимальное значения масштаба
  if (currentScale < MIN_SCALE_VALUE) {
    currentScale = MIN_SCALE_VALUE;
  } else if (currentScale > MAX_SCALE_VALUE) {
    currentScale = MAX_SCALE_VALUE;
  }

  // Устанавливаем новое значение масштаба
  scalerValueElement.value = `${currentScale}%`;
  pictureElement.style.transform = `scale(${currentScale / 100})`;
};

// Обработчик клика по кнопкам изменения масштаба
const onScaleButtonClick = (evt) => {
  if (evt.target.matches('button')) {
    let coefficient = 1;

    // Определяем коэффициент в зависимости от нажатой кнопки
    if (evt.target.matches('.scale__control--smaller')) {
      coefficient = -1;
    }

    // Изменяем масштаб
    changeScale(coefficient);
  }
};

// Функция для установки начального значения масштаба
const setInitialScale = () => {
  scalerValueElement.value = `${MAX_SCALE_VALUE}%`;
  pictureElement.style.transform = `scale(${MAX_SCALE_VALUE / 100})`;
};

// Добавляем обработчик события для кнопок изменения масштаба
scaleElement.addEventListener('click', onScaleButtonClick);

// Экспортируем функцию установки начального значения масштаба
export { setInitialScale };
