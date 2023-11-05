function checkLengthString (string, symbolsLimit){
  return (string.length <= symbolsLimit);
  }

  console.log(checkLengthString('проверяемая строка', 20)); // true
  console.log(checkLengthString('проверяемая строка', 18)); // true
  console.log(checkLengthString('проверяемая строка', 10)); // false

function isPalindrom (string) {
string = string.toLowerCase().replaceAll(' ','');
let resultString = '';
for (let i = (string.length-1); i >= 0; i--){
  resultString += string[i];
}
return (resultString === string);
}
console.log(isPalindrom('проверяемая строка')); // false
console.log(isPalindrom('Алла')); // true
console.log(isPalindrom('ДовОд')); // true
console.log(isPalindrom('Лёша на полке клопа нашёл ')); // true


//Функция, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит
const convertToMinutes = (arr) => ((+arr[0] * 60) + +arr[1]);

const checkTime = (start, end, startMeeting, duration) => {
  const startTime = start.split(':');
  const endTime = end.split(':');
  const startMeetingTime = startMeeting.split(':');

  const startMinutesTime = convertToMinutes(startTime);
  const endMinutesTime = convertToMinutes(endTime);
  const startMeetingMinutesTime  = convertToMinutes(startMeetingTime);

  return startMeetingMinutesTime >= startMinutesTime && startMeetingMinutesTime + duration <= endMinutesTime;
};

checkTime('08:00', '17:30', '14:00', 90);
checkTime('8:0', '10:0', '8:0', 120);
checkTime('08:00', '14:30', '14:00', 90);
checkTime('14:00', '17:30', '08:0', 90);
checkTime('8:00', '17:30', '08:00', 900);
