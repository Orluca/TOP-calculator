"use strict";

// ####################### DOM SELECTORS #######################
const $calculatorContainer = document.querySelector(".calculator-container");
const $displayInput = document.querySelector(".display-input");
const $displayHistory = document.querySelector(".display-history");

// ####################### GLOBAL VARIABLES #######################
let currentNumber = "";
let storedNumber = 0;
let activeOperator = "";
let isFinished = false;

// ####################### MATH OPERATIONS #######################
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return b - a;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b / a;
}

function operate(a, b, operator) {
  if (operator === "add") return add(a, b);
  if (operator === "subtract") return subtract(a, b);
  if (operator === "multiply") return multiply(a, b);
  if (operator === "divide") return divide(a, b);
}

// ####################### NUMBER PAD #######################
$calculatorContainer.addEventListener("click", function (e) {
  // Listen for number key presses
  if (e.target.classList.contains("number")) {
    if (isFinished) {
      $displayHistory.textContent = "";
      $displayInput.textContent = "";

      isFinished = false;
    }

    currentNumber += e.target.textContent;
    $displayInput.textContent = currentNumber;
  }

  // Listen for operator key presses
  if (e.target.classList.contains("operator")) {
    if (isFinished) {
      currentNumber = $displayInput.textContent;
      $displayHistory.textContent = "";
      isFinished = false;
    }
    currentNumber = Number(currentNumber);

    if (activeOperator) {
      storedNumber = operate(currentNumber, storedNumber, activeOperator);
    } else {
      storedNumber = currentNumber;
    }

    $displayHistory.textContent += currentNumber;

    if (e.target.classList.contains("add")) {
      $displayHistory.textContent += " + ";
      activeOperator = "add";
    } else if (e.target.classList.contains("subtract")) {
      $displayHistory.textContent += " - ";
      activeOperator = "subtract";
    } else if (e.target.classList.contains("multiply")) {
      $displayHistory.textContent += " * ";
      activeOperator = "multiply";
    } else if (e.target.classList.contains("divide")) {
      $displayHistory.textContent += " / ";
      activeOperator = "divide";
    }

    currentNumber = "";
    $displayInput.textContent = storedNumber;
  }

  if (e.target.classList.contains("calculate")) {
    currentNumber = Number(currentNumber);
    storedNumber = operate(currentNumber, storedNumber, activeOperator);
    $displayInput.textContent = storedNumber;
    $displayHistory.textContent += `${currentNumber} = `;
    isFinished = true;
    currentNumber = "";
    storedNumber = "";
    activeOperator = "";
  }
});
