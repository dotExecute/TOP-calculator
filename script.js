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
  // handling division by 0
  if (operator === "÷" && num2 === 0) {
    return "🍞YOU🍞, What are you?!";
  }
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
        // check if answer is a number
        if (!isNaN(answer)) {
          inputField.value = answer;
          num1 = answer;
          operatorClicked = e.target.textContent;
          isResultDisplayed = true;
        } else {
          // if error do this
          num1 = null;
          num2 = null;
          operatorClicked = null;
          inputField.value = answer;
          isResultDisplayed = true;
        }
        console.log("num1: " + num1);
        console.log("num2: " + num2);
        console.log("operator: " + operatorClicked);
      } else {
        if (inputField.value && !isNaN(Number(inputField.value))) {
          num1 = Number(inputField.value);
        }
        operatorClicked = e.target.textContent;
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
    if (num1 && operatorClicked && inputField.value) {
      num2 = Number(inputField.value);
      let answer = operate(num1, num2, operatorClicked);

      //check if answer is a number
      if (!isNaN(answer)) {
        num1 = answer;
        isResultDisplayed = true;
        inputField.value = answer;
      } else {
        // if error do this
        num1 = null;
        num2 = null;
        operatorClicked = null;
        inputField.value = answer;
        isResultDisplayed = true;
      }
      console.log("num1: " + num1);
      console.log("num2: " + num2);
      console.log("operator: " + operatorClicked);
    } else {
      if (inputField.value && !isNaN(Number(inputField.value))) {
        num1 = Number(inputField.value);
      }
    }
  });
}
getResult();
