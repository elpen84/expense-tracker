const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummy = [
  { id: 1, text: "flower", amount: -20 },
  { id: 2, text: "salary", amount: -300 },
  { id: 3, text: "RTX 3080", amount: 700 },
  { id: 4, text: "Ryzen 5", amount: 500 },
];

let transaction = dummy;

// add transaction to dom list

function addTransactionDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  // add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn">X</button>
    `;

  list.appendChild(item);
}

//update balance income and expense
function updateValues() {
  const amount = transaction.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);

const income = amount
.filter(item => item > 0)
.reduce((acct, item) => (acc += item), 0)
.toFixed(2);

const expense = amount
.filter(item < 0)
.reduce((acc,
     item) => (acc += item), 0) * -1).toFixed(2)

  console.log(total);
}

//init app
function init() {
  list.innerHTML = "";

  transaction.forEach(addTransactionDOM);
  updateValues();
}

init();
