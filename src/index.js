import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRequest from './exchange-request.js';

function getElements(response, currency){
  let currencyExists = checkCurrency(response, currency);
  if (response.result == 'success'){
    $('.errorTest').text(`The call was a ${response.result}`);
  } else {
    $('.errorTest').text(`There was an error: ${response}`);
  }
  if (currencyExists){
    console.log('exists');
  } else {
    console.log('dont');
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

async function makeApiCall(currency) {
  const response = await ExchangeRequest.getExchange();
  getElements(response, currency);
}

$(document).ready(function(){

});

$('form#currencyConverter').submit(function(event) {
  event.preventDefault();
  let currency = ($('#currency').val()).toUpperCase();
  makeApiCall(currency);   
});