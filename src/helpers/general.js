export function initialize(store, router, axios) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const token = store.state.token;
    
        // if(currentUser){
        //     Echo.connector.pusher.config.auth.headers['Authorization'] = `Bearer ${store.getters.currentUser.token}`
        // }

        if(token){
            axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}` 
        }

        if (requiresAuth && !token) {
            next('/admin/login');
        } 
         else {
            next();
        }

        // switch( to.meta.permission ){


        //     case 'organizer':
        //       if( store.getters.currentUser.permission == 1 ){
        //         next();
        //       }else{
        //         next('/home');
        //       }
        //     break;

        //     case 'admin':
        //     if( store.getters.currentUser.permission == 2 ){
        //       next();
        //     }else{
        //       next('/home');
        //     }
        //   break;

        // }


    })



    axios.interceptors.response.use(null, (error) => {
        if (error.response.status == 401) {
            store.commit('destroyToken');
            router.push('/admin/login');
            //NProgress.done();
        }

        return Promise.reject(error);
    })

}