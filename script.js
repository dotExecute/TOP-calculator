// DOM variables
const btnContainer = document.querySelector(".lower");
const inputField = document.querySelector(".input-field");
const result = document.querySelector(".result");

// variables to store userinputs
let num1;
let num2;
let operator;

let numClicked;
let operatorClicked;
let isResultDisplayed;

// obj to store operations
const calcObj = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  x: function (a, b) {
    return a * b;
  },
  "÷": function (a, b) {
    return a / b;
  },
};

// takes in user input and does operations on it
function operate(num1, num2, operator) {
  return calcObj[operator](num1, num2);
}

// get the number pressed, store and display
function getNumClicked() {
  btnContainer.addEventListener("click", (e) => {
    if (e.target.matches(".numbers")) {
      if (isResultDisplayed) {
        numClicked = e.target.textContent;
        inputField.value = numClicked;
        isResultDisplayed = false;
        console.log(numClicked);
      } else {
        numClicked = e.target.textContent;
        inputField.value += numClicked;
        console.log(numClicked);
      }
    }
  });
}
getNumClicked();

// perform operations and get result
function getOperationClicked() {
  btnContainer.addEventListener("click", (e) => {
    if (e.target.matches(".operator")) {
      if (num1 && operatorClicked && inputField.value) {
        num2 = Number(inputField.value);
        let answer = operate(num1, num2, operatorClicked);
        num1 = answer;
        operatorClicked = e.target.textContent;
        isResultDisplayed = true;
        return (inputField.value = answer);
      } else {
        operatorClicked = e.target.textContent;
        num1 = Number(inputField.value);
        inputField.value = "";
        console.log(num1);
      }
    }
  });
}
getOperationClicked();

// calculate and display result
function getResult() {
  result.addEventListener("click", () => {
    num2 = Number(inputField.value);
    let answer = operate(num1, num2, operatorClicked);
    num1 = answer;
    isResultDisplayed = true;
    return (inputField.value = answer);
  });
}
getResult();
