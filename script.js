// variables to store userinputs
let num1;
let num2;
let operator;

// obj to store operations
const calcObj = {
  '+': function (a, b) {
    return a + b;
  },
  '-': function (a, b) {
    return a - b;
  },
  '*': function (a, b) {
    return a * b;
  },
  '/': function (a, b) {
    return a / b;
  },
};

// takes in user input and does operations on it
function operate(num1, num2, operator){
    return calcObj[operator](num1, num2);
}

console.log(operate(5, 7, '+'));