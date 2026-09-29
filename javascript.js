// ============================================
// CURRENCY CONVERTER - Simple JavaScript
// ============================================
 
// Step 1: Set up our exchange rates.
// This tells us how much 1 US Dollar (USD) is worth in each currency.
var exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 149.5,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.4
};
 
// Step 2: Grab all the HTML elements we need to work with.
var form = document.getElementById("converter-form");
var amountInput = document.getElementById("amount");
var errorText = document.getElementById("amount-error");
var fromDropdown = document.getElementById("from-currency");
var toDropdown = document.getElementById("to-currency");
var swapButton = document.getElementById("swap-btn");
var resetButton = document.getElementById("reset-btn");
 
 
// Step 3: Fill the two dropdown menus with currency options.
function fillDropdowns() {
  // Loop through every currency code (USD, EUR, GBP, etc.)
  for (var code in exchangeRates) {
    // Add it to the "From" dropdown
    var option1 = document.createElement("option");
    option1.value = code;
    option1.text = code;
    fromDropdown.appendChild(option1);
 
    // Add it to the "To" dropdown
    var option2 = document.createElement("option");
    option2.value = code;
    option2.text = code;
    toDropdown.appendChild(option2);
  }
 
  // Set some sensible defaults
  fromDropdown.value = "USD";
  toDropdown.value = "EUR";
}
 
 
// Step 4: The math that converts one currency to another.
function convertCurrency(amount, fromCode, toCode) {
  // First, turn the amount into US Dollars.
  var amountInUSD = amount / exchangeRates[fromCode];
 
  // Then, turn those US Dollars into the target currency.
  var result = amountInUSD * exchangeRates[toCode];
 
  return result;
}
 
 
// Step 5: Make numbers look nice, like "1,234.56" instead of "1234.5600001".
function formatNumber(number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
 
 
// Step 6: Show an error message under the amount box.
function showError(message) {
  amountInput.classList.add("invalid");
  errorText.textContent = message;
}
 
 
// Step 7: Clear any error message that's showing.
function clearError() {
  amountInput.classList.remove("invalid");
  errorText.textContent = "";
}
 
 
// Step 8: Run the whole conversion process from start to finish.
function handleConvert() {
  // Get whatever the user typed, and remove extra spaces.
  var typedValue = amountInput.value.trim();
 
  // Get the chosen currencies.
  var fromCurrency = fromDropdown.value;
  var toCurrency = toDropdown.value;
 
  // Check 1: Did the user leave the box empty?
  if (typedValue === "") {
    showError("Please enter an amount.");
    return; // Stop here, don't continue.
  }
 
  // Turn the text the user typed into an actual number.
  var amount = parseFloat(typedValue);
 
  // Check 2: Is it actually a valid number?
  if (isNaN(amount)) {
    showError("Please enter a valid number.");
    return;
  }
 
  // Check 3: Is it a negative number?
  if (amount < 0) {
    showError("Amount cannot be negative.");
    return;
  }
 
  // If we made it this far, the input is valid!
  clearError();
 
  // Do the conversion.
  var convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
 
  // Show the result to the user with a simple popup.
  alert(formatNumber(amount) + " " + fromCurrency + " = " + formatNumber(convertedAmount) + " " + toCurrency);
}
 
 
// Step 9: Reset everything back to its starting state.
function handleReset() {
  form.reset();
  fromDropdown.value = "USD";
  toDropdown.value = "EUR";
  clearError();
}
 
 
// Step 10: Swap the "From" and "To" currencies.
function handleSwap() {
  var temp = fromDropdown.value;
  fromDropdown.value = toDropdown.value;
  toDropdown.value = temp;
}
 
 
// Step 11: Connect our functions to the page's buttons and form.
// "addEventListener" means: "when this happens, run this function."
 
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stops the page from refreshing.
  handleConvert();
});
 
resetButton.addEventListener("click", handleReset);
 
swapButton.addEventListener("click", handleSwap);
 
// Clear the error as soon as the user starts typing again.
amountInput.addEventListener("input", function () {
  if (amountInput.value.trim() !== "") {
    clearError();
  }
});
 
 
// Step 12: Run this once when the page first loads.
fillDropdowns();