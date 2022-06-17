let carts = document.querySelectorAll ('.add-cart');

let products =[
    {
        name:'Pink Boots',
        tag: 'pinkboots',
        price: 900,
        inCart:0
    },
    {
        name:'Black and White PJ',
        tag: 'blackandwhitepj',
        price: 600,
        inCart:0
    },
    {
        name:' Yellow Boots',
        tag: 'yellowboots',
        price: 900,
        inCart:0
    },
    {
        name:'Green Blazer Set',
        tag: 'greenblazerset',
        price: 1200,
        inCart:0

    }
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onloadCartNumbers () {
    let productNumbers= localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    console.log("The product clicked",product);
    let productNumbers= localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
   
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent=1
    }
    setItems(product)
}

function setItems(product){
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My cartItems are", cartItems);

    if (cartItems != null) {
    
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
            cartItems[product.tag].inCart += 1;    
        }
    }else{
      product.inCart = 1;
      cartItems = {
        [product.tag]: product
     }
    }
    localStorage.setItem("productInCart", JSON.stringify
    (cartItems));
}

function totalCost(product) {
    // console.log("The product price is",product.price);
let cartCost = localStorage.getItem('totalCost');

console.log("My cartCost is", cartCost);
console.log(typeof cartCost);

if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost",cartCost +
    product.price);
}else{
    localStorage.setItem("totalCost",product.price); 
   }
} 

function displayCart(){
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");

    // console.log(cartItems);

    if(cartItems && productContainer ) {
        productContainer.innerHTML='';
        Object.values(cartItems) .map(item=> {
            
            productContainer.innerHTML+= `
            <div class="product">
                <ion-icon name="add-circle-outline"></ion-icon>
                <img src="./images/${item.tag}.jpg"/>
                <span> ${item.name} </span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon name="remove-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div> 
            `; 
        });

         productContainer.innerHTML+= `
         <br/><hr/><br/>
        <div class="basketTotalContainer">     
        <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal"></h4>
        </div>
       `
    }
}

onloadCartNumbers();
displayCart();