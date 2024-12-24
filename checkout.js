// Warenkorbdaten laden und anzeigen
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const checkoutItemsContainer = document.getElementById("checkoutItems");
const checkoutTotalContainer = document.getElementById("checkoutTotal");

function renderCheckout() {
    let total = 0;
    checkoutItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div>${item.name} (${item.size})</div>
                <div>${item.price.toFixed(2)} € x ${item.quantity} = ${itemTotal.toFixed(2)} €</div>
            </div>
        `;
    }).join('');

    checkoutTotalContainer.innerHTML = `Gesamt: ${total.toFixed(2)} €`;
}

renderCheckout();

// PayPal- und WhatsApp-Variablen (diese kann der Restaurantbesitzer anpassen)
const restaurantWhatsAppNumber = "4915209067708";  // Beispielnummer ohne "+"

// Barzahlung: Bestellinformationen per WhatsApp senden
function payWithCash() {
    const customerName = document.getElementById("customerName").value.trim();
    const customerAddress = document.getElementById("customerAddress").value.trim();

    if (!customerName || !customerAddress) {
        alert("Bitte fülle alle Felder aus.");
        return;
    }

    const message = generateOrderMessage(customerName, customerAddress);
    window.location.href = `https://wa.me/${restaurantWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}

// Funktion zur Berechnung der Gesamtsumme
function calculateTotalAmount() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Nachricht für WhatsApp-Bestellung generieren
function generateOrderMessage(name, address) {
    let message = `Neue Bestellung bei Jamo's Pizza:\n`;
    cart.forEach(item => {
        message += `- ${item.name} (${item.size}) x ${item.quantity}   ${item.price.toFixed(2)} €\n`;
    });
    message += `\nGesamt: ${calculateTotalAmount().toFixed(2)} €`;
    message += `\n\nKundendaten:\nName: ${name}\nAdresse: ${address}`;
    return message;
}
