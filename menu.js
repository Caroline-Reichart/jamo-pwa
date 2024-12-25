// Warenkorb aus localStorage laden
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Menü aus `menu.json` laden und anzeigen
fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        const categoryElement = document.getElementById("category");
        categoryElement.innerHTML = data.categories.map(cat => {
            const items = cat.items.map(item => {
                const sizes = item.sizes
                    .map(size => `
                        <div class="size-price">
                            <div class="price">${size.size}: ${size.price.toFixed(2)} €</div>
                            <button onclick="addToCart('${item.name}', '${size.size}', ${size.price})">
                                In den Warenkorb
                            </button>
                        </div>
                    `).join('');

                return `
                    <div class="menu-item">
                        <div>
                            <div class="item-name">${item.name}</div>
                            <div class="item-ingredients">${item.Zutaten}</div>
                            <div class="item-allergene">${item.allergene}</div>
                        </div>
                        <div class="item-sizes">
                            ${sizes}
                        </div>
                    </div>
                `;
            }).join('');
            return `<div><h2 class="cath2">${cat.name}</h2>${items}</div>`;
        }).join('');
    })
    .catch(error => console.error('Error fetching menu data:', error));

// Funktion zum Hinzufügen eines Artikels zum Warenkorb
function addToCart(name, size, price) {
    const item = { name, size, price, quantity: 1 };
    
    // Warenkorb aus localStorage laden
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(i => i.name === name && i.size === size);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1; // Menge erhöhen
    } else {
        cart.push(item); // Neuer Artikel hinzufügen
    }
    
    localStorage.setItem("cart", JSON.stringify(cart)); // Warenkorb speichern
    updateCartCount(); // Warenkorb-Zähler aktualisieren
}

// Funktion zum Aktualisieren des Warenkorbzählers
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").textContent = cartCount;
}

// Initiale Aktualisierung des Warenkorbzählers bei Seitenaufruf
updateCartCount();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);
            })
            .catch((error) => {
                console.error("Service Worker registration failed:", error);
            });
    });
}
