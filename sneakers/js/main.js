const mainImg = document.querySelector('.main__img');

const thumbs = document.querySelectorAll('.thumb');

const priceEl = document.querySelector('.price');

const qtyEl = document.querySelector('.qty');

const minusBtn = document.querySelector('.minus');

const plusBtn = document.querySelector('.plus');

const addCartBtn = document.querySelector('.add__cart');

const cartBtn = document.querySelector('.cart__btn');

const cartBox = document.querySelector('.cart__box');

const cartContent = document.querySelector('.cart__content');

const cartCount = document.querySelector('.cart__count');

const menuBtn = document.querySelector('.menu__btn');

let qty = 0;
let currentPrice = parseFloat(mainImg.dataset.price);
let cartItems = [];

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.src = thumb.src;
        currentPrice = parseFloat(thumb.dataset.price);
        priceEl.textContent = '$' + currentPrice;
    });
});

minusBtn.addEventListener('click', () => {
    if (qty <= 0) return;
    qty--;
    qtyEl.textContent = qty;
});

plusBtn.addEventListener('click', () => {
    qty++;
    qtyEl.textContent = qty;
});

cartBtn.addEventListener('click', e => {
    e.stopPropagation();
    cartBox.style.display = cartBox.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', e => {
    if (!cartBox.contains(e.target) && e.target !== cartBtn) {
        cartBox.style.display = 'none';
    }
});

addCartBtn.addEventListener('click', () => {
    if (qty === 0) {
        alert('Mahsulot sonini tanlang!');
        return;
    }

    const existing = cartItems.find(item => item.src === mainImg.src);
    if (existing) {
        existing.qty += qty;
    } else {
        cartItems.push({
            src: mainImg.src,
            name: 'Fall Limited Edition Sneakers',
            price: currentPrice,
            qty
        });
    }

    qty = 0;
    qtyEl.textContent = 0;
    renderCart();
});

function renderCart() {
    const total = cartItems.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = total;
    cartCount.style.display = total > 0 ? 'inline' : 'none';

    if (!cartItems.length) {
        cartContent.innerHTML = '<p style="color:#999;text-align:center;padding:20px 0">Your cart is empty.</p>';
        return;
    }

    cartContent.innerHTML = cartItems.map((item, i) => `
        <div class="cart__product">
            <img src="${item.src}" alt="">
            <div style="flex:1">
                <p style="font-size:14px;color:#444">${item.name}</p>
                <p style="font-size:14px;color:#444">
                    $${item.price.toFixed(2)} x ${item.qty}
                    <strong>$${(item.price * item.qty).toFixed(2)}</strong>
                </p>
            </div>
            <button onclick="removeItem(${i})" style="border:none;background:none;cursor:pointer;color:#aaa;font-size:16px">✕</button>
        </div>
    `).join('') + '<button class="checkout__btn">Checkout</button>';
}

function removeItem(i) {
    cartItems.splice(i, 1);
    renderCart();
}

cartCount.style.display = 'none';

let overlay = document.querySelector('.overlay');
let mobileMenu = document.querySelector('.mobile__menu');

if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
}

if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile__menu';
    mobileMenu.innerHTML = `
        <div class="navbar">
            <button class="close__menu">✕</button>
        </div>
        <a href="#">Collections</a>
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
    `;
    document.body.appendChild(mobileMenu);
}

const closeMenuBtn = mobileMenu.querySelector('.close__menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
});

function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
}

closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);