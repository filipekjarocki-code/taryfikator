// --------------------
// Toggle sekcji
// --------------------
function toggleSection(id) {
    const section = document.getElementById(id);
    section.style.display = section.style.display === "block" ? "none" : "block";
}

// --------------------
// Koszyk
// --------------------
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} → ${item.price}zł`;
        li.onclick = () => removeFromCart(index);
        cartItems.appendChild(li);
    });
    document.getElementById('cart-total').textContent = `Suma: ${total}zł`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('copy-cart').addEventListener('click', () => {
    if(cart.length === 0) {
        alert('Koszyk jest pusty!');
        return;
    }
    let text = cart.map(item => `${item.name} → ${item.price}zł`).join('\n');
    text += `\nSuma: ${cart.reduce((acc, item) => acc + item.price, 0)}zł`;
    navigator.clipboard.writeText(text).then(() => {
        alert('Koszyk skopiowany do schowka!');
    });
});

// --------------------
// Motyw jasny/ciemny
// --------------------
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

const style = document.createElement('style');
style.textContent = `
body.light-theme {
    background: linear-gradient(135deg, #fff, #ccc);
    color: #111;
}

body.light-theme .menu-btn, body.light-theme #theme-toggle, body.light-theme #copy-cart {
    background: #eee;
    color: #111;
    border: 1px solid #111;
}

body.light-theme .content, body.light-theme .cart {
    background: #f9f9f9;
    border: 1px solid #111;
    color: #111;
}
`;
document.head.appendChild(style);
