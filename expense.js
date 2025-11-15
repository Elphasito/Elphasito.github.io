// const balanceEl = document.getElementById("balance");
// const incomeAmountEl = document.getElementById("income-amount");
// const expenseAmountEl = document.getElementById("expense-amount");
// const transactionListEl = document.getElementById("transaction-list");
// const transactionFormEl = document.getElementById("transaction-form");
// const descriptionEl = document.getElementById("description");
// const amountEl = document.getElementById("amount");

// let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// transactionFormEl.addEventListener("submit", addTransaction);

// function addTransaction(e){
//     e.preventDefault();

//     //get form values

//     const description = descriptionEl.value.trim();
//     const amount = parseFloat(amountEl.value);

//     transactions.push({
//         id:Date.now(),
//         description,
//         amount
//     });

//     localStorage.setItem("transactions", JSON.stringify(transactions));

//     updateTransactionList();
//     updateSummary();

//     transactionFormEl.reset();
// }

// function updateTransactionList(){
//     transactionFormEl.innerHTML = "";

//     const sortedTransactions = [...transactions].reverse();

//     sortedTransactions.forEach((transaction) =>{
//         const transactionEl = createTransactionElement(transaction)
//         transactionListEl.appendChild(transactionEl);
//     })
// }

// function createTransactionElement(transaction){
//     const li = document.createElement("li")
//     li.classList.add("transaction");
//     li.classList.add(transaction.amount> 0 ? "income" : "expense");

//     li.innerHTML = ` 
//     <span>${transaction.description}</span>
//     <span>
//         ${formatCurrency(transaction.amount)}
//         <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
//     </span>
//     `;
//     return li
// }

// function updateSummary(){
//     const balance = transactions.reduce((acc,transaction) => acc + transaction.amount, 0);
     
//     const income = transactions.filter((transaction) => transaction.amount > 0).reduce((acc,transaction) => acc + transaction.amount, 0);

//     const expenses = transactions.filter((transaction) => transaction.amount < 0).reduce((acc,transaction) => acc + transaction.amount, 0);


//     //update ui

//     balanceEl.textContent = formatCurrency(balance);
//     incomeAmountEl.textContent = formatCurrency(income);
//     expenseAmountEl.textContent = formatCurrency(expenses);
// }

// function formatCurrency(number){
//     return new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency:"USD",
//     }).format(number);
// }

// function removeTransaction(id){
//     //filter out the one we wanted to delete
//     transactions = transactions.filter(transaction => transaction.id !== id)

//     localStorage.setItem("transactions", JSON.stringify(transactions));

//     updateTransactionList();
//     updateSummary();
// }

// //initial render

// updateSummary();
// updateTransactionList();


// ==== ELEMENTS ====
const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");

const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

// ==== STATE ====
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ==== EVENT LISTENERS ====
transactionFormEl.addEventListener("submit", handleAddTransaction);

// ==== FUNCTIONS ====

function handleAddTransaction(e) {
    e.preventDefault();

    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    if (!description || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const newTransaction = {
        id: Date.now(),
        description,
        amount
    };

    transactions.push(newTransaction);
    saveTransactions();
    render();

    transactionFormEl.reset();
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function render() {
    updateTransactionList();
    updateSummary();
}

function updateTransactionList() {
    transactionListEl.innerHTML = ""; // fixed bug

    // display latest first
    const items = [...transactions].reverse();

    items.forEach(transaction => {
        const li = document.createElement("li");
        li.classList.add("transaction", transaction.amount > 0 ? "income" : "expense");

        const descSpan = document.createElement("span");
        descSpan.textContent = transaction.description;

        const valueSpan = document.createElement("span");
        valueSpan.textContent = formatCurrency(transaction.amount);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", () => removeTransaction(transaction.id));

        valueSpan.appendChild(deleteBtn);

        li.appendChild(descSpan);
        li.appendChild(valueSpan);

        transactionListEl.appendChild(li);
    });
}

function updateSummary() {
    const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
    const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);

    balanceEl.textContent = formatCurrency(balance);
    incomeAmountEl.textContent = formatCurrency(income);
    expenseAmountEl.textContent = formatCurrency(expense);
}

function formatCurrency(number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(number);
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    render();
}

// ==== INITIAL RENDER ====
render();

