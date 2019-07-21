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
}