const bar = document.querySelector('.bars');
const mobileView = document.querySelector('.mobile-view');
const overlay = document.querySelector('.overlay');
const cartIconDesktop = document.querySelector('.desktop-action .cart-icon');
const cartIconMobile = document.querySelector('.mobile-view .cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardContainer = document.querySelector('.card-container');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValueDesktop = document.querySelector('.desktop-action .cart-value');
const cartValueMobile = document.querySelector('.mobile-view .cart-circle .cart-value');

function toggleMenu() {
  mobileView.classList.toggle('mobile-view-active');
  overlay.classList.toggle('active');
}

if (cartIconDesktop) {
  cartIconDesktop.addEventListener('click', () => {
    cartTab.classList.add('cart-tab-active');
  });
}

if (cartIconMobile) {
  cartIconMobile.addEventListener('click', () => {
    cartTab.classList.add('cart-tab-active');
  });
}

closeBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));



bar.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu); 

var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

//  CART-LIST--INSIDE-FUNCTIONALITY

let productList = [];
let cartProduct = [];

 const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  cartList.querySelectorAll('.item').forEach(item =>{
    const quantity = parseInt(item.querySelector('.quantity-value').textContent)
    const price = parseFloat(item.querySelector('.item-total').textContent.replace("$",""));
    totalPrice += price;
    totalQuantity += quantity;

  });
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`
 if (cartValueDesktop) cartValueDesktop.textContent = totalQuantity; 
 if (cartValueMobile) cartValueMobile.textContent = totalQuantity; 
};



const addToCart = (product) => {
// const existingProduct = cartProduct.find(item => item.id === product.id);
const existingProduct = cartProduct.find((item) => item.id === product.id);
if(existingProduct){
  alert('item already added to your cart')
  return;
}

cartProduct.push(product);
let quantity = 1;
// let price = parseFloat(product.price.replace('$',''))
let price = parseFloat(product.price.replace('$',''));

  const cartItem = document.createElement('div');
  cartItem.classList.add('item');
  cartItem.innerHTML = `
 <div class="image-containerr">
                            <img src="${product.image}" >
                        </div>
                        <div class="burger">
                            <h4>${product.name}</h4>
                            <div class="item-total">${product.price}</div>
                        </div>
                        <div class="item-pl-mi">
                            <a href="#" class="quantity-button minuss"><i class="fa-solid fa-minus"></i></a>
                            <h4 class="quantity-value"> ${quantity}</h4>
                            <a href="#" class="quantity-button pluss"><i class="fa-solid fa-plus"></i></a>
                        </div>
 `
 cartList.appendChild(cartItem);
 updateTotals();

const plusbtn = cartItem.querySelector('.pluss');
const minusbtn = cartItem.querySelector('.minuss');
const quantityValue = cartItem.querySelector('.quantity-value');
const itemTotal = cartItem.querySelector('.item-total');

plusbtn.addEventListener('click' , (e) =>{
  e.preventDefault();
  quantity++;
  quantityValue.textContent  = quantity;
  // itemTotal.textContent = `$${(price * quantity).toFixed(2)}`
   itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
   updateTotals();
});

minusbtn.addEventListener('click' , (e) =>{
  e.preventDefault();
  if(quantity >1){
    quantity--;
  quantityValue.textContent  = quantity;
   itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
   updateTotals();
  }
  else{
    cartItem.remove();
    cartProduct = cartProduct.filter(item => item.id !== product.id)  
    updateTotals();  
  }

})
 
}

function showcard() {
  productList.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
                     <div class="card-img">
                        <img src="${product.image}" alt="">
                    </div>
                    <h3> ${product.name}</h3>
                    <p> ${product.price}</p>
                    <a href="#" class="sigh-in card-btn">Add to cart</a>
                </div>
    `
    cardContainer.appendChild(card);
    const cartBtn = card.querySelector('.card-btn');
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    })
  })

};

async function initApp() {
  try {

    const response = await fetch('product.json');
    const data = await response.json();
    productList = data;
    showcard();

  } catch (error) {
    console.error("Error loading products:", error);
  }
};

initApp();


