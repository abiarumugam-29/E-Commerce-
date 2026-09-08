export function productCard(product) {

    return `

        <article class="product-card">

            <img
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

                <p>
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <div class="product-buttons">

                    <a
                        href="#/product/${product.id}"
                        class="btn secondary"
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


export function updateCartCount(cart) {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById("cartCount");


    cartCount.textContent = count;

}
