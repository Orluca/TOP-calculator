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
let aString = ""; // The number which the user is actively typing in; on the lower side of the GUI
let aNumber;
let bString = ""; // The result of all previous calculations; on the upper side of the GUID
let bNumber = "";
let activeOperator = ""; // Tracking if the user has already pressed an operator and which one
let operatorWasPressedLast = false; // Tracking if the last thing the user has pressed is an operator. Necessary to allow user to change the activeOperator in case of misclicks or similar

// ####################### EVENT LISTENERS #######################
$btnsNumbers.forEach((btn) =>
  btn.addEventListener("click", function () {
    handleNumbers(this.textContent);
  })
);

// $btnsOperators.forEach((operator) => {
//   operator.addEventListener("click", function (e) {
//     handleOperators(e.target.dataset.operator);
//   });
// });

// $btnCalculate.addEventListener("click", handleCalc);
// $btnDelete.addEventListener("click", handleDelete);
// $btnClear.addEventListener("click", handleClear);
// $btnDecimal.addEventListener("click", handleDecimal);
// $btnNegation.addEventListener("click", handleNegation);

// window.addEventListener("keydown", handleKeyPresses);

// ####################### FUNCTIONS #######################
function displayA(numA) {
  $displayInput.value = Number(numA).toLocaleString();
}

function handleNumbers(num) {
  // The user did not change his mind about which operator to use, so set operatorWasPressedLast to false
  operatorWasPressedLast = false;

  // Attach pressed number onto numberA and display it on the GUI
  aString += num;
  displayA(aString);

  // $displayInput.value = Number(numberA).toLocaleString();
  // $displayInput.value = aString;
  // $displayInput.dispatchEvent(updateEvent);
}
