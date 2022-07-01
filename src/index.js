import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRequest from './exchange-request.js';

//Business Logic 

function checkCurrency(response, currency){
  let currencyExist = false;
  const keys = Object.keys(response.conversion_rates);
  keys.forEach((key) => {
    if (currency == key){
      currencyExist = true;
    }
  });
  return currencyExist;
}

async function makeApiCall(currency, USD) {
  const response = await ExchangeRequest.getExchange();
  getElements(response, currency, USD);
}

//UI Logic

function getElements(response, currency, USD){
  if (response.result == 'success'){
    let currencyExists = checkCurrency(response, currency);
    $('.errorTest').text(`THE CALL WAS A ${response.result.toUpperCase()}`);
    if (currencyExists) {
      let convertedCurrency = response.conversion_rates[currency] * USD;
      $('#convertedCurrency').text(`${USD} USD IS ${convertedCurrency.toFixed(2)} ${currency}`);
    } else {
      $('#convertedCurrency').text(`BUT ${currency} IS NOT A VALID CURRENCY`);
    }
  } else {
    $('.errorTest').text(`THERE WAS AN ERROR: ${response}`);
  } 
}

$('form#currencyConverter').submit(function(event) {
  event.preventDefault();
  let currency = ($('#currency').val()).toUpperCase();
  let USD = parseInt($('#USD').val());
  makeApiCall(currency, USD);   
});