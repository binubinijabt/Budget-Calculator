
//  function displays() {

//      input1.value += result
    
//  }




// function evaluateExp() {
//     exp=  result.value//4+6
//     output=eval(exp)//10
//     result.value=output
  
//   }




// function display() {
//     balanceAmt =+ formGo.value;
// }

document.getElementById('expForm').addEventListener('submit', addTransaction);
// initial array of transactions, reading from localStorage
const transactions = JSON.parse(localStorage.getItem('transactions')) || []



function addTransaction(e) {
    e.preventDefault();
    // get type, name, and amount
    let type = document.getElementById('formSign').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
    if (formSign != 'chooseOne'
      && name.length > 0
      && amount > 0) {
      const transaction = {
        type,
        name,
        amount,
        id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
      }
      transactions.push(transaction);
      // localStorage 
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    document.getElementById('expForm').reset();
    showTransactions();
    updateBalance();
  }
  const showTransactions = () => {
    const transactionTable = document.getElementById('transactionTable');
    transactionTable.innerHTML = '';
    for (let i = 0; i < transactions.length; i++) {
      transactionTable.innerHTML += `
            <tr>
                <td style="font-size: larger;font-weight: 300;">${transactions[i].type}</td>
                <td style="font-size: larger;font-weight: 300;">${transactions[i].name}</td>
                <td style="font-size: larger;font-weight: 300;">$${transactions[i].amount}</td>
                <td style="font-size: larger;font-weight: 300;"><a class="deleteButton" onclick="deleteTransaction(${transactions[i].id})">
                    Delete</td>
            </tr>
        `;
    }
  }





  const deleteTransaction = (id) => {
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id == id) {
        transactions.splice(i, 1);
      }
    }
    // localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));
    showTransactions();
    updateBalance();
  }


  const updateBalance = () => {
    let balance = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        balance += Number(transaction.amount);
      } else if (transaction.type === "expense") {
        balance -= transaction.amount;
      }
    });
    document.querySelector(".balance").textContent = balance;
  }
