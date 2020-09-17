const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummy = [
//   { id: 1, text: "flower", amount: -20 },
//   { id: 2, text: "salary", amount: -300 },
//   { id: 3, text: "RTX 3080", amount: 700 },
//   { id: 4, text: "Ryzen 5", amount: 500 },
// ];

const localStorageTransaction = JSON.parse(localStorage.getItem("transaction"));

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransaction : [];

// let transactions = localStorage.getItem('transaction');

// add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// generate random id
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

// add transaction to dom list

function addTransactionDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  // add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${
          transaction.id
        })">X</button>
    `;

  list.appendChild(item);
}

//update balance income and expense
function updateValues() {
  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amount
    .filter((item) => item > 0)
    .reduce((acct, item) => (acct += item), 0)
    .toFixed(2);

  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
  console.log(total);
}

// remove transaction by ID

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

//update local storage transaction

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
