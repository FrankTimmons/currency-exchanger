import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRequest from './exchange-request.js';

function getElements(response){
  $('.errorTest').text(`There was an error: ${response}`);
}

async function makeApiCall() {
  const response = await ExchangeRequest.getExchange();
  getElements(response);
}

$(document).ready(function(){
  makeApiCall();
});