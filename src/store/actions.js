import axios from 'axios'
export default {
        retrieveToken(context, credentials){
          return new Promise((resolve, reject) => {
              axios.post('/api/login', {
                  username: credentials.username,
                  password: credentials.password,
              })
              .then(response => {
                  var token = response.data.token.access_token
                  localStorage.setItem('access_token', token)
                  context.commit('retrieveToken', token)
                  resolve(response)
    
              })
              .catch(error => {
                  reject(error)
              })
            })
          },
          destroyToken(context, credentials){
            if(context.getters.loggedIn) {
              return new Promise((resolve, reject) => {
                  axios.post('/api/logout', credentials)
                  .then(response => {
                      localStorage.removeItem('access_token')
                      context.commit('destroyToken')
                      resolve(response)
                  })
                  .catch(error => {
                      localStorage.removeItem('access_token')
                      context.commit('destroyToken')
                      reject(error)
                  })
              })
            }
          },
        //////////////////////////////////////////PRODUCT ACTIONS/////////////////////////////////////
        retrieveProducts(context, params){
             return new Promise((resolve, reject) => {
                 axios.get(`/api/product?order_by=${params.sortBy ? params.sortBy : 'id'}&sort_by=${params.descending ? 'desc' : 'asc'}&rowsPerPage=${params.per_page}&page=${params.current_page}`)   
                 .then(response => {
                     console.log(response.data.data)
                   //this.products = response.data.responseData.data
                   context.commit('retrieveProducts' , response.data.data)
                   resolve(response)
                 })
                 .catch(error => {
                   console.log(error)
                   reject(error)
                })
            })
        },
        addProduct(context, credentials){
            return new Promise((resolve, reject) => {
                console.log(credentials)
                axios.post('/api/product/store', credentials)
                .then(response => {
                  //context.state.products.push(response.data.responseData);
                  context.commit('pushProduct' , response.data)
                  resolve(response)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
              })
            },

            updateProduct(context, product){
                let formData = new FormData()
                formData.append('id', product.id)
                formData.append('name', product.name)
                formData.append('brand_id', product.brand_id)
                formData.append('category_id', product.category_id)
                formData.append('description', product.description)
                formData.append('price', product.price)
                if (product.full_image) {
                  formData.append('full_image', product.full_image, product.imageName)
                }
                formData.append('_method', 'PUT')
    
                return new Promise((resolve, reject) => {
                  //var vm = this;
                    console.log(product.id)
                    axios.post(`/api/product/update/${product.id}`, formData)
                    .then(response => {
                      //context.state.products.push(response.data.responseData);
  
                      console.log(response.data)
                      context.commit('updateProduct' , response.data)
                      resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
                  })
                }, 
            deleteProduct(context, product){
                    //const id = product.id
                    return new Promise((resolve, reject) => {
                      axios.delete(`/api/product/delete/${product.id}`, product).then(response => {
                        context.commit('deleteProduct' , product)
                        resolve(response)
                    })
                  })
                },
        retrieveCategories(context){
            axios.get('/api/category')
                .then((response) => {
                    context.commit('retrieveCategories' , response.data)
                })
        },
        retrieveBrands(context){
            axios.get('/api/brand')
                .then((response) => {
                    context.commit('retrieveBrands' , response.data)
                })
        }
            
}