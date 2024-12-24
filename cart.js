// Warenkorbdaten aus localStorage laden
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalContainer = document.getElementById("cartTotal");

function renderCart() {
    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <div>
                    <div>${item.name} (${item.size})</div>
                    <div>${item.price.toFixed(2)} € x ${item.quantity} = ${itemTotal.toFixed(2)} €</div>
                </div>
                <div class="quantity-control">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');
    
    // Gesamtsumme anzeigen
    cartTotalContainer.innerHTML = `Gesamt: ${total.toFixed(2)} €`;
    localStorage.setItem("cart", JSON.stringify(cart)); // Speichere aktualisierten Warenkorb
}

// Funktion zur Aktualisierung der Artikelmenge
function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity < 1) {
        cart.splice(index, 1); // Artikel entfernen, wenn Menge weniger als 1 ist
    }
    
    renderCart(); // Warenkorb neu rendern
}

// Initiale Warenkorbanzeige
renderCart();