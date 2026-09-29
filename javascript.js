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
var form = document.getElementById("converter-form");
var amountInput = document.getElementById("amount");
var errorText = document.getElementById("amount-error");
var fromDropdown = document.getElementById("from-currency");
var toDropdown = document.getElementById("to-currency");
var swapButton = document.getElementById("swap-btn");
var resetButton = document.getElementById("reset-btn");
function fillDropdowns() {
  for (var code in exchangeRates) {

    var option1 = document.createElement("option");
    option1.value = code;
    option1.text = code;
    fromDropdown.appendChild(option1);


    var option2 = document.createElement("option");
    option2.value = code;
    option2.text = code;
    toDropdown.appendChild(option2);
  }


  fromDropdown.value = "USD";
  toDropdown.value = "EUR";
}
function convertCurrency(amount, fromCode, toCode) {
  var amountInUSD = amount / exchangeRates[fromCode];


  var result = amountInUSD * exchangeRates[toCode];

  return result;
}
function formatNumber(number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}


function showError(message) {
  amountInput.classList.add("invalid");
  errorText.textContent = message;
}

function clearError() {
  amountInput.classList.remove("invalid");
  errorText.textContent = "";
}


function handleConvert() {
  var typedValue = amountInput.value.trim();
  var fromCurrency = fromDropdown.value;
  var toCurrency = toDropdown.value;
  if (typedValue === "") {
    showError("Please enter an amount.");
    return;
  }

  var amount = parseFloat(typedValue);

  if (isNaN(amount)) {
    showError("Please enter a valid number.");
    return;
  }

  if (amount < 0) {
    showError("Amount cannot be negative.");
    return;
  }

  clearError();


  var convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);

  alert(formatNumber(amount) + " " + fromCurrency + " = " + formatNumber(convertedAmount) + " " + toCurrency);
}


function handleReset() {
  form.reset();
  fromDropdown.value = "USD";
  toDropdown.value = "EUR";
  clearError();
}


function handleSwap() {
  var temp = fromDropdown.value;
  fromDropdown.value = toDropdown.value;
  toDropdown.value = temp;
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  handleConvert();
});

resetButton.addEventListener("click", handleReset);

swapButton.addEventListener("click", handleSwap);
amountInput.addEventListener("input", function () {
  if (amountInput.value.trim() !== "") {
    clearError();
  }
});


fillDropdowns();