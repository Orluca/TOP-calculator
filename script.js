"use strict";

// ####################### DOM SELECTORS #######################
const $displayInput = document.querySelector(".display-input");
const $displayInputContainer = document.querySelector(".display-input-container");
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
  operator.addEventListener("click", function (e) {
    handleOperators(e.target.dataset.operator);
  });
});

$btnCalculate.addEventListener("click", handleCalc);
$btnDelete.addEventListener("click", handleDelete);
$btnClear.addEventListener("click", handleClear);
$btnDecimal.addEventListener("click", handleDecimal);
$btnNegation.addEventListener("click", handleNegation);

window.addEventListener("keydown", handleKeyPresses);

// ####################### MATH OPERATIONS #######################

const add = (a, b) => a + b;
const subtract = (a, b) => b - a;
const multiply = (a, b) => a * b;
const divide = (a, b) => b / a;
const exponent = (a, b) => Math.pow(b, a);
const root = (a, b) => Math.pow(b, 1 / a);

const updateEvent = new Event("update");

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);

  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return divide(a, b);
  if (operator === "^") return exponent(a, b);
  if (operator === "√") return root(a, b);
}

// ####################### FUNCTIONS #######################
function displayInput(num) {
  // $displayInput.value = Number(num).toLocaleString();

  const formattingOptions = {
    style: "decimal",
    maximumFractionDigits: "20",
  };

  $displayInput.value = Number(num).toLocaleString(undefined, formattingOptions);
}

function handleNumbers(num) {
  // Cap the amount of digits a number can have at 16
  if (numberA.replace(".", "").length > 15) return;

  // The user did not change his mind about which operator to use, so set operatorWasPressedLast to false
  operatorWasPressedLast = false;

  // Attach pressed number onto numberA and display it on the GUI
  numberA += num;
  // $displayInput.value = numberA;
  displayInput(numberA);
  $displayInput.dispatchEvent(updateEvent);
}

function handleOperators(operator) {
  // Cancel the function if the user tries to divide by 0
  if (activeOperator === "/" && numberA === "0") {
    alert("You can't divide by 0");
    numberA = "";
    return;
  }

  // Check if the user has previously pressed an operate button. If yes, execute the corresponding calculation
  // Skip this line if the last thing the user has pressed was an operator, i.e. he misclicked or changed his mind and wants to use another operator
  if (!operatorWasPressedLast) numberB = activeOperator ? operate(numberA, numberB, activeOperator) : numberA;

  // Set the activeOperator to the pressed operator
  activeOperator = operator;

  // Update the number displays on the GUI
  $displayHistory.textContent = `${Number(numberB).toLocaleString()} ${operator}`;
  displayInput(numberB);

  // Reset numberA
  numberA = "";

  // Indicate that the user has last pressed an operator, so that a future operator can be skipped in case the user wants to change to another operator
  operatorWasPressedLast = true;

  $displayInput.dispatchEvent(updateEvent);
}

function handleCalc() {
  // Cancel the function if the user tries to divide by 0
  if (activeOperator === "/" && numberA === "0") {
    alert("You can't divide by 0");
    numberA = "";
    return;
  }

  // Disable calculate if the user hasn't finished typing in a proper calculation in yet
  if (!activeOperator || operatorWasPressedLast) return;

  $displayHistory.textContent = `${Number(numberB).toLocaleString()} ${activeOperator} ${Number(numberA).toLocaleString()} =`;
  // $displayInput.value = operate(numberA, numberB, activeOperator);
  displayInput(operate(numberA, numberB, activeOperator));

  $displayInput.dispatchEvent(updateEvent);
}

function handleDelete() {
  // Delete the last char of the numberA string and update the GUI
  numberA = numberA.slice(0, -1);
  // $displayInput.value = numberA;
  displayInput(numberA);

  $displayInput.dispatchEvent(updateEvent);
}

function handleClear() {
  // Reset everything back to the default values
  numberA = "";
  numberB = "";
  activeOperator = "";
  operatorWasPressedLast = false;
  $displayHistory.textContent = "";
  $displayInput.value = 0;
}

function handleDecimal() {
  // Add a decimal point to the end of numberA, but only if it doesn't already have one. Then update the GUI
  if (numberA.includes(".")) return;
  numberA += ".";
}

function handleNegation() {
  // Check if the first char of numberA is a minus sign. If yes, remove it, if not, add one
  numberA = numberA.slice(0, 1) === "-" ? numberA.slice(1) : `-${numberA}`;
  $displayInput.value = numberA;
}

function handleKeyLights(id) {
  const ids = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Enter", "Backspace", "Escape", ",", ".", "/", "*", "-", "+"];

  if (!ids.includes(id)) return;
  if (id === ".") id = ",";

  const element = document.querySelector(`[data-id="${id}"]`);

  element.classList.add("pressed-key");

  const removeClass = setTimeout(function () {
    element.classList.remove("pressed-key");
  }, 100);

  // removeClass();
}

function handleKeyPresses(e) {
  if (e.key >= 0 && e.key <= 9) handleNumbers(e.key);
  else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") handleOperators(e.key);
  else if (e.key === "." || e.key === ",") handleDecimal();
  else if (e.key === "Enter") handleCalc();
  else if (e.key === "Backspace") handleDelete();
  else if (e.key === "Escape") handleClear();

  handleKeyLights(e.key);
}

// ################# DYNAMIC FONT SIZE DISPLAY #################

let previousLength = 0;
let ratios = [];
const originalFontSize = window.getComputedStyle($displayInput).getPropertyValue("font-size").slice(0, -2);

$displayInput.addEventListener("update", function () {
  let fontSize = window.getComputedStyle($displayInput).getPropertyValue("font-size").slice(0, -2);
  const currentLength = $displayInput.value.length;

  if (currentLength < previousLength) {
    const ratio = ratios.pop();
    fontSize *= 1 / ratio;
  }
  if (currentLength > previousLength) {
    const inputWidth = $displayInput.scrollWidth;
    const containerWidth = $displayInputContainer.offsetWidth;
    const ratio = containerWidth / inputWidth;

    ratios.push(ratio);
    fontSize *= ratio;
  }
  if (currentLength === 1) fontSize = originalFontSize;

  previousLength = $displayInput.value.length;
  $displayInput.style.fontSize = `${fontSize}px`;
});
