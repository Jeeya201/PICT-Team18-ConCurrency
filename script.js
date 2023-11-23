// include api for currency change
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// Variables for different
var search = document.querySelector(".searchBox");
var resultFrom;
var toCurrecy = document.querySelector(".to");
var fromCurrecy = document.querySelector(".from");
var resultTo;
var searchValue;
var finalAmount = document.getElementById("finalAmount");
var finalValue = document.querySelector(".finalValue");
var convert = document.querySelector(".convert");

// changed in currency
toCurrecy.addEventListener("change", (event) => {
  resultTo = `${event.target.value}`;
});

// change in currency
fromCurrecy.addEventListener("change", (event) => {
  resultFrom = `${event.target.value}`;
});


search.addEventListener("input", updateValue);

// Updation of value
function updateValue(e) {
  searchValue = e.target.value;
}

// function getResult called
convert.addEventListener("click", getResults);

// get result
function getResults() {
  fetch(`${api}`)
    .then((currency) => {
      return currency.json();
    })
    .then(displayResults);
}

// Reset button clicked
function clearVal() {
  window.location.reload();
  document.getElementsByClassName("finalValue").innerHTML = "";
}


// Display results
function displayResults(currency) {
  let fromRate = currency.rates[resultFrom];
  let toRate = currency.rates[resultTo];
  finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2); //2 Decimal Places
  finalAmount.style.display = "block";
}

