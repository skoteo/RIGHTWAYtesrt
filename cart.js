// ====================================
// CART MANAGEMENT SYSTEM
// ====================================

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('rightway_cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('rightway_cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(item) {
    const cart = getCart();
    
    // Check if item already exists with same size
    const existingIndex = cart.findIndex(
        cartItem => cartItem.name === item.name && cartItem.size === item.size
    );
    
    if (existingIndex > -1) {
        // Item exists, increase quantity
        cart[existingIndex].quantity += item.quantity;
    } else {
        // New item, add to cart
        cart.push(item);
    }
    
    saveCart(cart);
    updateCartCount();
    
    // Show notification
    showNotification(`${item.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCartCount();
}

// Update cart count badge
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const countElements = document.querySelectorAll('#cartCount');
    countElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem('rightway_cart');
    updateCartCount();
}

// Calculate cart total
function calculateTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Show notification
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background-color: #1f1f1f;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0;
        font-family: 'Oswald', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
