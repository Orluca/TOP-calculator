let previousLength = 0;
let ratio;

$displayInput.addEventListener("update", function () {
  let fontSize;
  const currentLength = $displayInput.value.length;
  if (currentLength < previousLength) {
    fontSize = Number(window.getComputedStyle($displayInput).getPropertyValue("font-size").slice(0, -2)) * (1 / ratio);
  }

  const inputWidth = $displayInput.scrollWidth;
  const containerWidth = $displayInputContainer.offsetWidth;
  ratio = containerWidth / inputWidth;

  if (currentLength > previousLength) {
    fontSize = Number(window.getComputedStyle($displayInput).getPropertyValue("font-size").slice(0, -2)) * ratio;
  }

  previousLength = $displayInput.value.length;

  $displayInput.style.fontSize = `${fontSize}px`;

  console.log("INPUT WIDTH: " + inputWidth);
  console.log("CONTAINER WIDTH: " + containerWidth);
  console.log("RATIO: " + ratio);
  console.log("FONT SIZE: " + fontSize);
  console.log("########################");
});
