export function getRoute() {

    const hash = window.location.hash;

    if (!hash || hash === "#/") {

        return {
            page: "home"
        };

    }


    if (hash === "#/products") {

        return {
            page: "products"
        };

    }


    if (hash === "#/cart") {

        return {
            page: "cart"
        };

    }


    if (hash.startsWith("#/product/")) {

        const id =
            Number(
                hash.split("/")[2]
            );

        return {
            page: "product",
            id: id
        };

    }


    return {
        page: "home"
    };

}
