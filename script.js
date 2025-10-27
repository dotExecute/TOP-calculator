// DOM variables
const btnContainer = document.querySelector(".lower");
const inputField = document.querySelector(".input-field");
const result = document.querySelector(".result");
const clearBtn = document.querySelector(".clear-btn");
const allBtn = document.querySelectorAll(".numbers");
const allOperators = document.querySelectorAll(".operator");

// variables to store userinputs
let num1;
let num2;
let operator;

let numClicked;
let operatorClicked;
let isResultDisplayed;

let lastValue = [];

// obj to store operations
const calcObj = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  "x": function (a, b) {
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

// store last button pressed
function storeLastValue(value) {
  lastValue.push(value);
  console.log("last value:" + lastValue);
}

// clear all input and reset
function getClearBtn() {
  clearBtn.addEventListener("click", () => {
    if (inputField.value) {
      inputField.value = "";
      num1 = null;
      num2 = null;
      operatorClicked = null;
      isResultDisplayed = false;
    } else {
      return;
    }
    console.log(num1, num2, operatorClicked);
  });
}
getClearBtn();

// get the number pressed, store and display
function getNumClicked() {
  // UI nums
  btnContainer.addEventListener("click", (e) => {
    if (e.target.matches(".numbers")) {
      storeLastValue(numClicked);

      // handle decimal
      if (e.target.textContent === "." && inputField.value.includes(".")) {
        return;
      }

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
        let answer = Number(operate(num1, num2, operatorClicked).toFixed(2));
        // check if answer is a number
        if (!isNaN(answer)) {
          num1 = answer;
          num1 = null;
          num2 = null;
          operatorClicked = e.target.textContent;
          inputField.value = answer;
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
          operatorClicked = e.target.textContent;
          inputField.value = ""; // emptying to stop making the previous if condition true
          console.log(num1);
        }
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
      let answer = Number(operate(num1, num2, operatorClicked).toFixed(2));

      //check if answer is a number
      if (!isNaN(answer)) {
        num1 = answer;
        num1 = null;
        num2 = null;
        inputField.value = answer;
        isResultDisplayed = true;
      } else {
        // if error do this
        num1 = null;
        num2 = null;
        inputField.value = answer;
        isResultDisplayed = true;
      }
      console.log("num1: " + num1);
      console.log("num2: " + num2);
      console.log("operator: " + operatorClicked);
    } else {
      if (inputField.value && !isNaN(Number(inputField.value))) {
        num1 = Number(inputField.value);
        num2 = null;
        operatorClicked = null;
      }
    }
  });
}
getResult();

// get keyboard keys
function getKeyboard() {
  document.addEventListener("keydown", (event) => {
    let key = event.key;
    console.log(key);

    if (key >= "0" && key <= "9") {
      allBtn.forEach((btn) => {
        // check if key press matches a ui button
        if (btn.textContent === key) {
          btn.click();
        }
      });
    }

    // add opertator key support
    else if (key === "+" || key === "-" || key === "*" || key === "/") {
      // assign operators to corresponding keys
      const operatorsAssign = {
        "+": "+",
        "-": "-",
        "*": "x",
        "/": "÷",
      };

      key = operatorsAssign[key];
      console.log(key);
      allOperators.forEach((operator) => {
        if (operator.textContent === key) {
          operator.click();
        }
      });
    }

    // add Enter key support
    else if (key === "Enter") {
      event.preventDefault();
      if (inputField.value) {
        result.click();
      } else {
        return;
      }
    }

    // add Esc key support
    else if (key === "Escape") {
      event.preventDefault();
      clearBtn.click();
    }

    // add Backspace support
    else if (key === "Backspace") {
      event.preventDefault();

      if (lastValue.length > 0) {
        // remove number from array
        const removeLast = lastValue.pop();

        // remove number from display
        inputField.value = inputField.value.slice(0, -1);

        console.log("Deleted:", removeLast);
        console.log("Remaining:", lastValue);
      }
    }

    // block other keys
    else {
      event.preventDefault();
    }
  });
}
getKeyboard();
