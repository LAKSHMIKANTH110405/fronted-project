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

var STORAGE_KEY = "currencyConverterState";

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



function saveState() {
  var state = {
    amount: amountInput.value,
    from: fromDropdown.value,
    to: toDropdown.value
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.log("Could not save to localStorage:", e);
  }
}

function loadState() {
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    var state = JSON.parse(saved);

    if (exchangeRates[state.from]) {
      fromDropdown.value = state.from;
    }
    if (exchangeRates[state.to]) {
      toDropdown.value = state.to;
    }
    if (state.amount) {
      amountInput.value = state.amount;
    }
  } catch (e) {
    console.log("Could not load from localStorage:", e);
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.log("Could not clear localStorage:", e);
  }
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

  saveState();

  alert(formatNumber(amount) + " " + fromCurrency + " = " + formatNumber(convertedAmount) + " " + toCurrency);
}

function handleSwap() {
  var temp = fromDropdown.value;
  fromDropdown.value = toDropdown.value;
  toDropdown.value = temp;
  saveState();
}

function handleReset() {
  form.reset();
  fromDropdown.value = "USD";
  toDropdown.value = "EUR";
  clearError();
  clearState();
}
fillDropdowns();
loadState(); 

form.addEventListener("submit", function (event) {
  event.preventDefault();
  handleConvert();
});
swapButton.addEventListener("click", handleSwap);
resetButton.addEventListener("click", handleReset);
fromDropdown.addEventListener("change", saveState);
toDropdown.addEventListener("change", saveState);