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
