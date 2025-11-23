const myModal = new bootstrap.Modal("#transactions-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

//Addicionar transação
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault;
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;
    data.transactions.unshift({
        value: value , type: type, description: description, date: date
    });
    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento Adicionado");

});

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

checkLogged();

function checkLogged(){
    if(session){
        sessionStorage.getItem("logged", session);
        logged = session;
        
    }
    if(!logged){
        window.location.href = "index.html";
        return;
    }
    
    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }
    getTransactions();
}


function saveData(data){
    localStorage.setItem(data.login , JSON.stringify(data));
}


function getTransactions(){
    const transaction = data.transactions;
    let transactionHTML = ``;

    if(transaction.length){
        transaction.forEach((item) =>{
            let type = "Entrada";

            if(item.type === "2"){
                type = "Saída";
            }

            transactionHTML += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>R$ ${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
            </tr>
            `;
        })
    }
    document.getElementById("transactions-list").innerHTML = transactionHTML;

}