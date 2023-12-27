const URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const SERVER_ERROR_MESSAGE = {
  GET_DATA: 'Данные не загрузились',
  POST_DATA: 'Данные не отправились',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, SERVER_ERROR_MESSAGE.GET_DATA);

const sendData = (body) => {
  load(Route.SEND_DATA, SERVER_ERROR_MESSAGE.POST_DATA, Method.POST, body);
};

export { getData, sendData };
