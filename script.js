"use strict";

// ####################### DOM SELECTORS #######################
const $calculatorContainer = document.querySelector(".calculator-container");
const $displayInput = document.querySelector(".display-input");
const $displayHistory = document.querySelector(".display-history");
const $btnsNumbers = document.querySelectorAll(".number");
const $btnsOperators = document.querySelectorAll(".operator");
const $btnCalculate = document.querySelector(".calculate");
const $btnDelete = document.querySelector(".delete");
const $btnClear = document.querySelector(".clear");
const $btnDecimal = document.querySelector(".decimal");
const $btnNegation = document.querySelector(".negation");

// ####################### GLOBAL VARIABLES #######################
let numberA = ""; // The number which the user is actively typing in; on the lower side of the GUI
let numberB = ""; // The result of all previous calculations; on the upper side of the GUID
let activeOperator = ""; // Tracking if the user has already pressed an operator and which one
let operatorWasPressedLast = false; // Tracking if the last thing the user has pressed is an operator. Necessary to allow user to change the activeOperator in case of misclicks or similar

// ####################### EVENT LISTENERS #######################
$btnsNumbers.forEach((btn) =>
  btn.addEventListener("click", function () {
    handleNumbers(this.textContent);
  })
);

$btnsOperators.forEach((operator) => {
  operator.addEventListener("click", function () {
    handleOperators(this.textContent);
  });
});

$btnCalculate.addEventListener("click", handleCalc);
$btnDelete.addEventListener("click", handleDelete);
$btnClear.addEventListener("click", handleClear);
$btnDecimal.addEventListener("click", handleDecimal);
$btnNegation.addEventListener("click", handleNegation);

// ####################### KEY PRESSES #######################
window.addEventListener("keydown", handleKeyPresses);
// ####################### MATH OPERATIONS #######################

const add = (a, b) => a + b;
const subtract = (a, b) => b - a;
const multiply = (a, b) => a * b;
const divide = (a, b) => b / a;
const exponent = (a, b) => Math.pow(b, a);
const root = (a, b) => Math.pow(b, 1 / a);

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);

  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return divide(a, b);
  if (operator === "^") return exponent(a, b);
  if (operator === "°") return root(a, b);
}

// ####################### FUNCTIONS #######################
function handleNumbers(num) {
  //
  operatorWasPressedLast = false;

  // Attach pressed number onto numberA and display it on the GUI
  numberA += num;
  $displayInput.textContent = numberA;
}

function handleOperators(operator) {
  // Check if the user has previously pressed an operate button. If yes, execute the corresponding calculation
  // Skip this line if the last thing the user has pressed was an operator, i.e. he misclicked or changed his mind and wants to use another operator
  if (!operatorWasPressedLast) numberB = activeOperator ? operate(numberA, numberB, activeOperator) : numberA;

  // Set the activeOperator to the pressed operator
  activeOperator = operator;

  // Update the number displays on the GUI
  $displayHistory.textContent = `${numberB} ${operator}`;
  $displayInput.textContent = numberB;

  // Reset
  numberA = "";

  operatorWasPressedLast = true;
}

function handleCalc() {
  $displayHistory.textContent = `${numberB} ${activeOperator} ${numberA} =`;
  $displayInput.textContent = operate(numberA, numberB, activeOperator);
}

function handleDelete() {
  numberA = numberA.slice(0, -1);
  $displayInput.textContent = numberA;
}

function handleClear() {
  numberA = "";
  numberB = "";
  activeOperator = "";
  operatorWasPressedLast = false;
  $displayHistory.textContent = "";
  $displayInput.textContent = 0;
}

function handleDecimal() {
  numberA += ".";
  $displayInput.textContent = numberA;
}

function handleNegation() {
  // Check if the first char of numberA is a minus sign. If yes, remove it, if not, add one
  numberA = numberA.slice(0, 1) === "-" ? numberA.slice(1) : `-${numberA}`;
  $displayInput.textContent = numberA;
}

function handleKeyPresses(e) {
  if (e.key >= 0 && e.key <= 9) handleNumbers(e.key);
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") handleOperators(e.key);
  if (e.key === "." || e.key === ",") handleDecimal();
  if (e.key === "Enter") handleCalc();
  if (e.key === "Backspace") handleDelete();
}
