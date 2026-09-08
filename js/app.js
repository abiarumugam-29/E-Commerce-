import { products } from "./products.js";

import {
    getCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal
} from "./cart.js";

import { getRoute } from "./router.js";

import {
    productCard,
    updateCartCount
} from "./ui.js";


const app =
    document.getElementById("app");


// -----------------------------------------
// ROUTER
// -----------------------------------------

function render() {

    const route = getRoute();


    if (route.page === "home") {

        renderHome();

    }

    else if (route.page === "products") {

        renderProducts();

    }

    else if (route.page === "product") {

        renderProductDetails(route.id);

    }

    else if (route.page === "cart") {

        renderCart();

    }


    updateCartCount(getCart());

}


// -----------------------------------------
// HOME
// -----------------------------------------

function renderHome() {

    app.innerHTML = `

        <section class="hero">

            <div>

                <span class="hero-label">
                    Welcome to ShopEase
                </span>

                <h1>
                    Discover products
                    you'll love.
                </h1>

                <p>
                    Explore our collection of
                    quality products at great prices.
                </p>

                <a
                    href="#/products"
                    class="btn"
                >
                    Explore Products
                </a>

            </div>

        </section>


        <section class="section">

            <h2>
                Featured Products
            </h2>

            <div class="product-grid">

                ${products
                    .slice(0, 4)
                    .map(productCard)
                    .join("")}

            </div>

        </section>

    `;

}


// -----------------------------------------
// PRODUCTS
// -----------------------------------------

function renderProducts() {

    app.innerHTML = `

        <section class="section">

            <h1>
                All Products
            </h1>


            <div class="controls">

                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search products..."
                >


                <select id="categoryFilter">

                    <option value="all">
                        All Categories
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>

                    <option value="Fashion">
                        Fashion
                    </option>

                    <option value="Home">
                        Home
                    </option>

                </select>


                <select id="sortSelect">

                    <option value="default">
                        Sort By
                    </option>

                    <option value="low">
                        Price: Low to High
                    </option>

                    <option value="high">
                        Price: High to Low
                    </option>

                </select>

            </div>


            <div
                id="productGrid"
                class="product-grid"
            >

            </div>

        </section>

    `;


    renderProductList(products);


    document
        .getElementById("searchInput")
        .addEventListener(
            "input",
            filterProducts
        );


    document
        .getElementById("categoryFilter")
        .addEventListener(
            "change",
            filterProducts
        );


    document
        .getElementById("sortSelect")
        .addEventListener(
            "change",
            filterProducts
        );

}


// -----------------------------------------
// FILTER PRODUCTS
// -----------------------------------------

function filterProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const category =
        document
            .getElementById("categoryFilter")
            .value;


    const sort =
        document
            .getElementById("sortSelect")
            .value;


    let filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    if (sort === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sort === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }


    renderProductList(filtered);

}


// -----------------------------------------
// PRODUCT LIST
// -----------------------------------------

function renderProductList(list) {

    const grid =
        document.getElementById(
            "productGrid"
        );


    if (!grid) return;


    if (list.length === 0) {

        grid.innerHTML = `
            <p class="empty">
                No products found.
            </p>
        `;

        return;

    }


    grid.innerHTML =
        list
            .map(productCard)
            .join("");

}


// -----------------------------------------
// PRODUCT DETAILS
// -----------------------------------------

function renderProductDetails(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) {

        app.innerHTML = `
            <section class="section">
                <h1>Product not found</h1>
                <a href="#/products">
                    Back to Products
                </a>
            </section>
        `;

        return;

    }


    app.innerHTML = `

        <section class="product-details">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <span class="category">
                    ${product.category}
                </span>

                <h1>
                    ${product.name}
                </h1>

                <h2>
                    ₹${product.price.toLocaleString("en-IN")}
                </h2>

                <p>
                    ${product.description}
                </p>

                <button
                    class="btn add-cart"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>

        </section>

    `;

}


// -----------------------------------------
// CART
// -----------------------------------------

function renderCart() {

    const cart = getCart();

    const total = getCartTotal();


    if (cart.length === 0) {

        app.innerHTML = `

            <section class="section empty">

                <h1>
                    Your cart is empty
                </h1>

                <p>
                    Add some products to get started.
                </p>

                <a
                    href="#/products"
                    class="btn"
                >
                    Browse Products
                </a>

            </section>

        `;

        return;

    }


    app.innerHTML = `

        <section class="section">

            <h1>
                Shopping Cart
            </h1>


            <div class="cart">

                ${cart.map(item => `

                    <div
                        class="cart-item"
                        data-id="${item.id}"
                    >

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                        <div>

                            <h3>
                                ${item.name}
                            </h3>

                            <p>
                                ₹${item.price.toLocaleString("en-IN")}
                            </p>

                        </div>


                        <div class="quantity">

                            <button
                                class="decrease"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                class="increase"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove"
                        >
                            Remove
                        </button>

                    </div>

                `).join("")}

            </div>


            <div class="cart-total">

                <h2>
                    Total:
                    ₹${total.toLocaleString("en-IN")}
                </h2>

                <button class="btn">
                    Checkout
                </button>

            </div>

        </section>

    `;

}


// -----------------------------------------
// EVENT DELEGATION
// -----------------------------------------

document.addEventListener(
    "click",
    function(event) {

        const addButton =
            event.target.closest(
                ".add-cart"
            );


        if (addButton) {

            const id =
                Number(
                    addButton.dataset.id
                );


            const product =
                products.find(
                    product =>
                        product.id === id
                );


            if (product) {

                addToCart(product);

                updateCartCount(
                    getCart()
                );

                alert(
                    "Product added to cart!"
                );

            }

        }


        // Increase quantity

        if (
            event.target.classList
                .contains("increase")
        ) {

            const cartItem =
                event.target.closest(
                    ".cart-item"
                );


            const id =
                Number(
                    cartItem.dataset.id
                );


            increaseQuantity(id);

            renderCart();

            updateCartCount(
                getCart()
            );

        }


        // Decrease quantity

        if (
            event.target.classList
                .contains("decrease")
        ) {

            const cartItem =
                event.target.closest(
                    ".cart-item"
                );


            const id =
                Number(
                    cartItem.dataset.id
                );


            decreaseQuantity(id);

            renderCart();

            updateCartCount(
                getCart()
            );

        }


        // Remove

        if (
            event.target.classList
                .contains("remove")
        ) {

            const cartItem =
                event.target.closest(
                    ".cart-item"
                );


            const id =
                Number(
                    cartItem.dataset.id
                );


            removeFromCart(id);

            renderCart();

            updateCartCount(
                getCart()
            );

        }

    }
);


// -----------------------------------------
// ROUTE CHANGE
// -----------------------------------------

window.addEventListener(
    "hashchange",
    render
);


// Initial render

render();
