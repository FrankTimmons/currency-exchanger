import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRequest from './exchange-request.js';

function getElements(response, currency, USD){
  if (response.result == 'success'){
    let currencyExists = checkCurrency(response, currency);
    $('.errorTest').text(`The call was a ${response.result}`);
    if (currencyExists) {
      let convertedCurrency = response.conversion_rates[currency] * USD;
      $('#convertedCurrency').text(`${USD} USD is ${convertedCurrency} ${currency}`);
    } else {
      $('#convertedCurrency').text(`But ${currency} is not a valid currency`);
    }
  } else {
    $('.errorTest').text(`There was an error: ${response}`);
  } 
}

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

$('form#currencyConverter').submit(function(event) {
  event.preventDefault();
  let currency = ($('#currency').val()).toUpperCase();
  let USD = parseInt($('#USD').val());
  makeApiCall(currency, USD);   
});