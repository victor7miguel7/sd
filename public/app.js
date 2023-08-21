let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'BATATA FRITA',
        image: 'batatafrita.jpg',
        price: 15
    },
    {
        id: 2,
        name: 'CHEDDAR BURGUER',
        image: 'cheddarburguer.jpeg',
        price: 25
    },
    {
        id: 3,
        name: 'CHICKEN BURGUER',
        image: 'chickenburguer.jpeg',
        price: 22
    },
    {
        id: 4,
        name: 'TRIPLE X-BACON',
        image: 'triplexbacon.jpeg',
        price: 32
    },
    {
        id: 5,
        name: 'X-TUDO',
        image: 'xtudo.jpg',
        price: 35
    },
    {
        id: 6,
        name: 'REFRIGERANTE LATA',
        image: 'refri.jpg',
        price: 7
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Adiciona ao Carrinho</button>`;
        list.appendChild(newDiv);
    })
}
initApp();

function addToCard(key){
    if(listCards[key] == null){
        // copy product from list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        // Send order to backend
        sendOrderToBackend(listCards[key]);
    }
    reloadCard();
}

// Function to send order to backend
function sendOrderToBackend(order) {
    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Log the response from the server
    })
    .catch(error => {
        console.error('Error sending order:', error);
    });
}


function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
