// Максимальное количество хэштегов и их длина
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAGS_LENGTH = 20;

// Получаем ссылку на форму
const uploadForm = document.querySelector('.img-upload__form');

// Получаем ссылки на элементы формы
const hashtagInputField = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('#upload-submit');

// Инициализация библиотеки для валидации формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

// Сообщение об ошибке
let errorMessage = '';

// Функция для получения сообщения об ошибке
const getErrorMessage = () => errorMessage;

// Обработчик валидации для поля хэштега
const hashtagErrorHandler = (value) => {
  errorMessage = '';

  const hashtagInputText = value.toLowerCase().trim();

  // Проверка наличия хотя бы одного хэштега
  if (hashtagInputText.length === 0) {
    return true;
  }

  const hashtagTexts = hashtagInputText.split(/\s+/);

  // Проверка, что хотя бы один хэштег присутствует
  if (hashtagTexts.length === 0) {
    return true;
  }

  // Правила валидации для введенных хэштегов
  const inputRules = [
    {
      rule: hashtagTexts.some((text) => text.indexOf('#', 1) > 0),
      error: 'Хэш-теги должны разделяться пробелами'
    },
    {
      rule: hashtagTexts.some((text) => text[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа # (решётка)'
    },
    {
      rule: hashtagTexts.some((text) => text.length === 1 || text[0] !== '#'),
      error: 'Хеш-тег не может состоять только из одной решётки'
    },
    {
      rule: hashtagTexts.some((text) => text.length > MAX_HASHTAGS_LENGTH),
      error: `Длина хеш-тега превышает ${MAX_HASHTAGS_LENGTH} символов`
    },
    {
      rule: hashtagTexts.some((text, index, array) => array.indexOf(text, index + 1) > index),
      error: 'Один и тот же хэш-тег не может быть использован дважды'
    },
    {
      rule: hashtagTexts.some((text) => !/^#[0-9а-яёa-z]{1,19}$/i.test(text)),
      error: 'Хеш-тег содержит недопустимые символы'
    },
    {
      rule: hashtagTexts.length > MAX_HASHTAGS_COUNT,
      error: `Нельзя указывать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`
    }
  ];

  // Проверяем все правила и формируем сообщение об ошибке
  return inputRules.every((inputRule) => {
    const isValid = !inputRule.rule;
    if (!isValid) {
      errorMessage = inputRule.error;
    }
    return isValid;
  });
};

// Добавляем валидатор для поля хэштега
pristine.addValidator(hashtagInputField, hashtagErrorHandler, getErrorMessage, 2, false);

// Обработчик изменения в поле хэштега
const onHashtagInputChange = () => {
  submitButton.disabled = !pristine.validate();
};

// Добавляем слушатель события ввода для поля хэштега
const setupHashtagInput = () => {
  hashtagInputField.addEventListener('input', onHashtagInputChange);
};

const checkFormValidation = () => pristine.validate();
const clearHashtagsField = () => {
  hashtagInputField.value = '';
  pristine.validate();
};

export {setupHashtagInput, clearHashtagsField, checkFormValidation};
