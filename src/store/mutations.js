import Vue from 'vue'
export default {
    retrieveToken(state, token){
        state.token = token
      },
    destroyToken(state){
        state.token = null
    },
    retrieveProducts(state, payload){
        state.products = payload
    },
    retrieveCategories(state, payload){
        state.categories = payload
    },
    retrieveBrands(state, payload){
        state.brands = payload
    },
    pushProduct(state, payload){
        state.products.push(payload)
    },
    updateProduct(state, payload){
        let updateIndex = state.products.findIndex(item => item.id === payload.id);
        Vue.set(state.products, updateIndex, payload)
    },
    deleteProduct(state, payload){
        const id = payload.id
        let deleteIndex = state.products.findIndex(item => item.id === id);
        state.products.splice(deleteIndex, 1)
    },
    assignSelectedProduct(state, payload){
        state.selected_product = payload
    },
    removeSelected(state){
        state.selected_product = null
    }
}