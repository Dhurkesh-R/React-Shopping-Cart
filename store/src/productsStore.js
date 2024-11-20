// coffee: price_1QLcRdJ4QokqvjWEQzSXTHGE
// sunglass: price_1QLcN6J4QokqvjWE9rNvXPVH
// Camera: price_1QLcPYJ4QokqvjWE4o1twCs2

const productsArray = [
    {
        id: "price_1QLcRdJ4QokqvjWEQzSXTHGE",
        title: "Coffee",
        image: "/images/coffee.jpeg",
        price: 4.99
    },
    {
        id: "price_1QLcN6J4QokqvjWE9rNvXPVH",
        title: "Sunglasses",
        image: "/images/Sunglasses.jpeg",
        price: 9.99
    },
    {
        id: "price_1QLcPYJ4QokqvjWE4o1twCs2",
        title: "Camera",
        image: "/images/camera.webp",
        price: 39.99
    }
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };