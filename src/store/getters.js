export default {
    loggedIn(state) {
        return state.token != null
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
}