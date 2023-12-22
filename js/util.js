const ALERT_SHOW_TIME = 4000;
function getRandomInteger(intFrom, intTo){
  if (intFrom > intTo || intFrom < 0 || intTo < 0 ){
    return  new Error('Error. Change input values');
  }
  return Math.round(intFrom - 0.5 + Math.random(intFrom, intTo) * (1 + intTo - intFrom));
}

const generateArray = (length, max) => (
  [...new Array(length)].map(() => Math.round(Math.random() * max)));

function getUniqNumber (usersId) {
  const temp = usersId[getRandomInteger(0,usersId.length-1)];

  delete(usersId[getRandomInteger(0,usersId.length-1)]);
  return temp;
}

const pressEscape = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getUniqNumber, getRandomInteger, pressEscape, generateArray, showAlert};

