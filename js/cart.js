const STORAGE_KEY = "shopease_cart";

let cart = JSON.parse(
    localStorage.getItem(STORAGE_KEY)
) || [];


// Get cart

export function getCart() {

    return cart;

}


// Add product

export function addToCart(product) {

    const existingProduct =
        cart.find(item => item.id === product.id);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

}


// Remove product

export function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

}


// Increase quantity

export function increaseQuantity(productId) {

    const product =
        cart.find(item => item.id === productId);

    if (product) {

        product.quantity++;

        saveCart();

    }

}


// Decrease quantity

export function decreaseQuantity(productId) {

    const product =
        cart.find(item => item.id === productId);

    if (!product) return;


    if (product.quantity > 1) {

        product.quantity--;

    } else {

        removeFromCart(productId);

        return;

    }


    saveCart();

}


// Calculate total

export function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

}


// Save cart

function saveCart() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cart)
    );

}
