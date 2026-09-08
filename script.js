// ======================================================
// SHOP EASE - E-COMMERCE CAPSTONE
// ======================================================


// ======================================================
// 1. PRODUCT DATA
// ======================================================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description:
            "High-quality wireless headphones with comfortable ear cushions, clear audio and long battery life."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 3499,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        description:
            "Modern smartwatch with fitness tracking, notifications and a stylish design."
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 1999,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        description:
            "Lightweight running shoes designed for comfort and everyday workouts."
    },

    {
        id: 4,
        name: "Travel Backpack",
        category: "Fashion",
        price: 1299,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        description:
            "Durable and stylish backpack suitable for college, office and travel."
    },

    {
        id: 5,
        name: "Ceramic Coffee Mug",
        category: "Home",
        price: 499,
        image:
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
        description:
            "Minimal ceramic coffee mug designed for home and office use."
    },

    {
        id: 6,
        name: "Modern Desk Lamp",
        category: "Home",
        price: 899,
        image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
        description:
            "Simple modern desk lamp perfect for studying, reading and working."
    },

    {
        id: 7,
        name: "Laptop",
        category: "Electronics",
        price: 54999,
        image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
        description:
            "Slim and powerful laptop suitable for students, developers and professionals."
    },

    {
        id: 8,
        name: "Classic T-Shirt",
        category: "Fashion",
        price: 799,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        description:
            "Comfortable classic cotton T-shirt suitable for everyday wear."
    },

    {
        id: 9,
        name: "Office Chair",
        category: "Home",
        price: 7499,
        image:
            "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80",
        description:
            "Comfortable office chair designed to support long working and study sessions."
    }

];


// ======================================================
// 2. APPLICATION STATE
// ======================================================

let cart =
    JSON.parse(
        localStorage.getItem("shopease_cart")
    ) || [];


// ======================================================
// 3. DOM ELEMENT
// ======================================================

const app =
    document.getElementById("app");

const cartCount =
    document.getElementById("cartCount");


// ======================================================
// 4. SAVE CART
// ======================================================

function saveCart() {

    localStorage.setItem(
        "shopease_cart",
        JSON.stringify(cart)
    );

}


// ======================================================
// 5. UPDATE CART COUNT
// ======================================================

function updateCartCount() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;

}


// ======================================================
// 6. FORMAT PRICE
// ======================================================

function formatPrice(price) {

    return `₹${price.toLocaleString("en-IN")}`;

}


// ======================================================
// 7. PRODUCT CARD
// ======================================================

function createProductCard(product) {

    return `

        <article class="product-card">

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-content">

                <span class="category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    ${formatPrice(product.price)}
                </p>

                <div class="product-actions">

                    <a
                        href="#product/${product.id}"
                        class="btn btn-secondary"
                    >
                        View
                    </a>

                    <button
                        class="btn add-cart"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </article>

    `;

}


// ======================================================
// 8. HOME PAGE
// ======================================================

function renderHome() {

    app.innerHTML = `

        <section class="hero">

            <div class="hero-content">

                <span class="hero-label">
                    WELCOME TO SHOPEASE
                </span>

                <h1>
                    Discover products
                    you'll love.
                </h1>

                <p>
                    Explore electronics, fashion and
                    home products in one simple store.
                </p>

                <a
                    href="#products"
                    class="btn"
                >
                    Explore Products
                </a>

            </div>

        </section>


        <section class="section">

            <div class="section-title">

                <h2>
                    Featured Products
                </h2>

                <p>
                    Popular products from our collection.
                </p>

            </div>


            <div class="product-grid">

                ${products
                    .slice(0, 6)
                    .map(createProductCard)
                    .join("")}

            </div>

        </section>

    `;

}


// ======================================================
// 9. PRODUCTS PAGE
// ======================================================

function renderProducts() {

    app.innerHTML = `

        <section class="section">

            <div class="section-title">

                <h1>
                    All Products
                </h1>

                <p>
                    Find the right product for you.
                </p>

            </div>


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


                <select id="sortFilter">

                    <option value="default">
                        Sort by
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


    displayProducts(products);


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
        .getElementById("sortFilter")
        .addEventListener(
            "change",
            filterProducts
        );

}


// ======================================================
// 10. DISPLAY PRODUCTS
// ======================================================

function displayProducts(productList) {

    const grid =
        document.getElementById(
            "productGrid"
        );


    if (!grid) return;


    if (productList.length === 0) {

        grid.innerHTML = `

            <div class="no-products">

                <h2>
                    No products found
                </h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    grid.innerHTML =
        productList
            .map(createProductCard)
            .join("");

}


// ======================================================
// 11. FILTER PRODUCTS
// ======================================================

function filterProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const category =
        document
            .getElementById("categoryFilter")
            .value;


    const sort =
        document
            .getElementById("sortFilter")
            .value;


    let result =
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

        result.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sort === "high") {

        result.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    displayProducts(result);

}


// ======================================================
// 12. PRODUCT DETAILS
// ======================================================

function renderProductDetails(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {

        app.innerHTML = `

            <section class="empty">

                <h1>
                    Product Not Found
                </h1>

                <p>
                    The requested product does not exist.
                </p>

                <a
                    href="#products"
                    class="btn"
                >
                    Back to Products
                </a>

            </section>

        `;

        return;

    }


    app.innerHTML = `

        <section class="product-details">

            <img
                class="product-details-image"
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="product-details-info">

                <span class="category">
                    ${product.category}
                </span>

                <h1>
                    ${product.name}
                </h1>

                <div class="details-price">
                    ${formatPrice(product.price)}
                </div>

                <p class="details-description">
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


// ======================================================
// 13. ADD TO CART
// ======================================================

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    alert(
        `${product.name} added to cart.`
    );

}


// ======================================================
// 14. REMOVE FROM CART
// ======================================================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart();

    renderCart();

    updateCartCount();

}


// ======================================================
// 15. INCREASE QUANTITY
// ======================================================

function increaseQuantity(productId) {

    const item =
        cart.find(
            item =>
                item.id === productId
        );


    if (!item) return;


    item.quantity++;

    saveCart();

    renderCart();

    updateCartCount();

}


// ======================================================
// 16. DECREASE QUANTITY
// ======================================================

function decreaseQuantity(productId) {

    const item =
        cart.find(
            item =>
                item.id === productId
        );


    if (!item) return;


    if (item.quantity > 1) {

        item.quantity--;

    }

    else {

        removeFromCart(productId);

        return;

    }


    saveCart();

    renderCart();

    updateCartCount();

}


// ======================================================
// 17. CART TOTAL
// ======================================================

function calculateCartTotal() {

    return cart.reduce(

        (total, item) =>

            total +
            item.price *
            item.quantity,

        0

    );

}


// ======================================================
// 18. CART PAGE
// ======================================================

function renderCart() {

    if (cart.length === 0) {

        app.innerHTML = `

            <section class="empty">

                <h1>
                    Your Cart is Empty
                </h1>

                <p>
                    Add some products to your cart.
                </p>

                <a
                    href="#products"
                    class="btn"
                >
                    Browse Products
                </a>

            </section>

        `;

        return;

    }


    const total =
        calculateCartTotal();


    app.innerHTML = `

        <section class="cart-container">

            <div class="section-title">

                <h1>
                    Shopping Cart
                </h1>

                <p>
                    Review your selected products.
                </p>

            </div>


            <div class="cart-list">

                ${cart.map(item => `

                    <div
                        class="cart-item"
                        data-id="${item.id}"
                    >

                        <img
                            class="cart-item-image"
                            src="${item.image}"
                            alt="${item.name}"
                        >


                        <div class="cart-item-info">

                            <h3>
                                ${item.name}
                            </h3>

                            <p>
                                ${formatPrice(item.price)}
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
                            class="remove-btn"
                        >
                            Remove
                        </button>

                    </div>

                `).join("")}

            </div>


            <div class="cart-summary">

                <h2>
                    Total:
                    ${formatPrice(total)}
                </h2>

                <button
                    class="btn checkout-btn"
                >
                    Checkout
                </button>

            </div>

        </section>

    `;

}


// ======================================================
// 19. EVENT DELEGATION
// ======================================================

document.addEventListener(
    "click",
    function(event) {

        // ------------------------------
        // ADD TO CART
        // ------------------------------

        const addButton =
            event.target.closest(
                ".add-cart"
            );


        if (addButton) {

            const id =
                Number(
                    addButton.dataset.id
                );


            addToCart(id);

            return;

        }


        // ------------------------------
        // INCREASE
        // ------------------------------

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

            return;

        }


        // ------------------------------
        // DECREASE
        // ------------------------------

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

            return;

        }


        // ------------------------------
        // REMOVE
        // ------------------------------

        if (
            event.target.classList
                .contains("remove-btn")
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

            return;

        }


        // ------------------------------
        // CHECKOUT
        // ------------------------------

        if (
            event.target.classList
                .contains("checkout-btn")
        ) {

            alert(
                "Checkout functionality will be added in a future version."
            );

        }

    }
);


// ======================================================
// 20. CLIENT-SIDE ROUTING
// ======================================================

function router() {

    const hash =
        window.location.hash;


    // Home

    if (
        hash === "" ||
        hash === "#home" ||
        hash === "#/"
    ) {

        renderHome();

    }


    // Products

    else if (
        hash === "#products"
    ) {

        renderProducts();

    }


    // Cart

    else if (
        hash === "#cart"
    ) {

        renderCart();

    }


    // Product details

    else if (
        hash.startsWith("#product/")
    ) {

        const id =
            Number(
                hash.split("/")[1]
            );


        renderProductDetails(id);

    }


    // Unknown route

    else {

        renderHome();

    }


    updateCartCount();

}


// ======================================================
// 21. ROUTE CHANGE
// ======================================================

window.addEventListener(
    "hashchange",
    router
);


// ======================================================
// 22. INITIAL APPLICATION
// ======================================================

router();
