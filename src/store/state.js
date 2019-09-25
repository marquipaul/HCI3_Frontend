export default {
    token: localStorage.getItem('access_token') || null,
    selected_product: localStorage.getItem('selectedProduct') || null,
    products: [],
    categories: [],
    brands: [],
    cart: localStorage.getItem('cartProducts') || "[]",
}