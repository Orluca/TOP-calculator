"use strict";

// ####################### DOM SELECTORS #######################
const $calculatorContainer = document.querySelector(".calculator-container");
const $displayInput = document.querySelector(".display-input");
const $displayHistory = document.querySelector(".display-history");

// ####################### GLOBAL VARIABLES #######################
let displayNumber = "";
let displayHistory = "";
let result = 0;
let activeOperator = "";
let isFinished = false;
let operationIsActive = false;

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

function exponent(a, b) {
  return Math.pow(b, a);
}

function root(a, b) {
  return Math.pow(b, 1 / a);
}

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);

  if (operator === "add") return add(a, b);
  if (operator === "subtract") return subtract(a, b);
  if (operator === "multiply") return multiply(a, b);
  if (operator === "divide") return divide(a, b);
  if (operator === "exponent") return exponent(a, b);
  if (operator === "root") return root(a, b);
}

// ####################### KEY PRESS LISTENERS #######################
$calculatorContainer.addEventListener("click", function (e) {
  // Listen for NUMBER key presses
  if (e.target.classList.contains("number")) {
    displayNumber += e.target.textContent; // Concatenate each pressed number onto the displayNumber variable
    $displayInput.textContent = displayNumber; // Display the displayNumber on the GUI
  }

  // Listen for OPERATOR key presses
  if (e.target.classList.contains("operator")) {
    // In case the user just finished a calculation but wants to keep going
    if (isFinished) {
      displayNumber = $displayInput.textContent;
      $displayHistory.textContent = "";
      isFinished = false;
    }

    if (!operationIsActive) {
      if (activeOperator) {
        // If there is an active operator, i.e. the user has pressed one of the operator buttons prior, execute the calculation and update the result accordingly
        result = operate(displayNumber, result, activeOperator);
      } else {
        // If there isn't an active operator,
        result = Number(displayNumber);
      }

      // Add the result to the displayHistory string
      displayHistory = result;
    }

    if (e.target.classList.contains("add")) {
      activeOperator = "add";
      displayHistory += " + ";
    } else if (e.target.classList.contains("subtract")) {
      activeOperator = "subtract";
      displayHistory += " - ";
    } else if (e.target.classList.contains("multiply")) {
      activeOperator = "multiply";
      displayHistory += " * ";
    } else if (e.target.classList.contains("divide")) {
      activeOperator = "divide";
      displayHistory += " / ";
    } else if (e.target.classList.contains("exponent")) {
      activeOperator = "exponent";
      displayHistory += " ^ ";
    } else if (e.target.classList.contains("root")) {
      activeOperator = "root";
      displayHistory += " ^1/ ";
    }

    operationIsActive = true;

    // Display the displayHistory string on the GUI
    $displayHistory.textContent = displayHistory;

    // Reset the displayNumber
    displayNumber = "";

    // Set the displayInput to the current interim result
    $displayInput.textContent = result;
  }

  // Listen for key presses of the "calculate" (=) button
  if (e.target.classList.contains("calculate")) {
    // Execute the final calculation
    result = operate(displayNumber, result, activeOperator);

    // Update the history display with the final calculation
    displayHistory += `${displayNumber} = `;
    $displayHistory.textContent = displayHistory;

    // Display the final result
    $displayInput.textContent = result;

    // Set the isFinished boolean to true (used for situations where the user wants to continue operating with the current result)
    isFinished = true;

    // Resets
    displayNumber = "";
    result = "";
    activeOperator = "";
  }
});
