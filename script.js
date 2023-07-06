const transactions = [];
let balance = 0;
let goalAmount = 0;
let currentGoalProgress = 0;

const transactionsContainer = document.getElementById("transactions-container");
const transactionForm = document.getElementById("transaction-form");
const balanceElement = document.getElementById("balance");
const goalContainer = document.getElementById("goal-container");
const goalProgress = document.getElementById("goal-progress");
const goalProgressLabel = document.getElementById("goal-progress-label");
const setGoalButton = document.getElementById("set-goal-button");

function renderTransactions() {
  transactionsContainer.innerHTML = "";

  transactions.forEach(transaction => {
    const transactionElement = document.createElement("li");
    transactionElement.classList.add("transaction-item");

    const descriptionElement = document.createElement("span");
    descriptionElement.textContent = transaction.description;
    descriptionElement.classList.add("description");
    transactionElement.appendChild(descriptionElement);

    const amountElement = document.createElement("span");
    amountElement.textContent = `$${transaction.amount}`;
    amountElement.classList.add("amount", transaction.amount >= 0 ? "positive" : "negative");
    transactionElement.appendChild(amountElement);

    transactionsContainer.appendChild(transactionElement);
  });

  balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
}

function addTransaction(event) {
  event.preventDefault();

  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const categorySelect = document.getElementById("category");

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  const newTransaction = { description, amount };
  transactions.push(newTransaction);

  if (category === "income") {
    balance += amount;
  } else if (category === "expenses") {
    balance -= amount;
  }

  renderTransactions();

  descriptionInput.value = "";
  amountInput.value = "";
  categorySelect.value = "";
}

function setGoal() {
  const goalInput = prompt("Enter your goal amount:");

  if (goalInput !== null) {
    goalAmount = parseFloat(goalInput);
    currentGoalProgress = 0;

    updateGoalProgress();

    if (goalAmount > 0) {
      goalContainer.style.display = "block";
      setGoalButton.textContent = "Update Goal";
    } else {
      goalContainer.style.display = "none";
    }
  }
}

function updateGoalProgress() {
  currentGoalProgress = (balance / goalAmount) * 100;

  if (currentGoalProgress > 100) {
    currentGoalProgress = 100;
  }

  goalProgress.style.width = `${currentGoalProgress}%`;
  goalProgressLabel.textContent = `${currentGoalProgress.toFixed(2)}%`;
}

transactionForm.addEventListener("submit", addTransaction);
setGoalButton.addEventListener("click", setGoal);

// Initial rendering
renderTransactions();

// Add goal tracking functionality
if (goalAmount > 0) {
  goalContainer.style.display = "block";
  setGoalButton.textContent = "Update Goal";
}
updateGoalProgress();
