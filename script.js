const transactions = [];

const transactionsContainer = document.getElementById("transactions-container");
const transactionForm = document.getElementById("transaction-form");
const balanceElement = document.getElementById("balance");

function renderTransactions() {
  transactionsContainer.innerHTML = "";
  
  let balance = 0;

  transactions.forEach(transaction => {
    const transactionElement = document.createElement("div");
    transactionElement.classList.add("transaction");
    
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = transaction.description;
    transactionElement.appendChild(descriptionElement);
    
    const amountElement = document.createElement("p");
    amountElement.textContent = `$${transaction.amount}`;
    amountElement.classList.add(transaction.amount >= 0 ? "positive" : "negative");
    transactionElement.appendChild(amountElement);
    
    transactionsContainer.appendChild(transactionElement);

    balance += transaction.amount;
  });

  balanceElement.textContent = `Balance: $${balance}`;
}

function addTransaction(event) {
  event.preventDefault();

  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  const newTransaction = { description, amount };
  transactions.push(newTransaction);

  renderTransactions();

  descriptionInput.value = "";
  amountInput.value = "";
}

transactionForm.addEventListener("submit", addTransaction);
