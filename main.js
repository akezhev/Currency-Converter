// Объект с курсами трех валют
const rates = {};

// Элементы для отображжения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// Элементы формы, ввод суммы, выбор валют, поле с результатом
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select = document.querySelector("#select");

getCurrencies();

setInterval(getCurrencies, 10000);

// Функция получения курса валют и отображения их на странице
async function getCurrencies() {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await response.json();
  const result = await data;

  rates.USD = result.Valute.USD;
  rates.EUR = result.Valute.EUR;
  rates.GBP = result.Valute.GBP;

  elementUSD.textContent = rates.USD.Value.toFixed(2);
  elementEUR.textContent = rates.EUR.Value.toFixed(2);
  elementGBP.textContent = rates.GBP.Value.toFixed(2);

  // Цвет для иформера USD
  if (rates.USD.Value > rates.USD.Previous) {
    elementUSD.classList.add("top");
  } else {
    elementUSD.classList.add("bottom");
  }

  // Цвет для иформера EUR
  if (rates.EUR.Value > rates.EUR.Previous) {
    elementEUR.classList.add("top");
  } else {
    elementEUR.classList.add("bottom");
  }

  // Цвет для иформера GBP
  if (rates.GBP.Value > rates.GBP.Previous) {
    elementGBP.classList.add("top");
  } else {
    elementGBP.classList.add("bottom");
  }
}

// Слушаем изменения в текстовом поле и в select
input.oninput = convertValue;
select.oninput = convertValue;

// Функция конвертации
function convertValue() {
  result.value = result.value = (
    parseFloat(input.value) / rates[select.value].Value
  ).toFixed(2);
}
