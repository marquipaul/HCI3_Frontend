export default {
    loggedIn(state) {
        return state.token != null
    },
    retrieveSelectedProduct(state){
        return state.selected_product
    },
    selected(state){
        return state.selected_product ? true : false
    },
    retrieveProducts(state){
        return state.products
    },
    retrieveCategories(state){
        return state.categories
    },
    retrieveBrands(state){
        return state.brands
    },
    getCart(state){
        return state.cart
    },
}