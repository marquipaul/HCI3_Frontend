<template>
    <nav>
        <v-toolbar
            app
            dense
            fixed
            clipped-left
        >
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawerOpen"></v-toolbar-side-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>PC</span>
                <span class="font-weight-light">SHOP</span>
            </v-toolbar-title>
            <div class="hidden-sm-and-down" v-if="!selected">
                <v-btn flat v-scroll-to="'#business'">
                    <span>Business Solutions</span>
                </v-btn>
                <v-btn flat v-scroll-to="'#components'">
                    <span>Components</span>
                </v-btn>
                <v-btn flat v-scroll-to="'#laptops'">
                    <span>Laptops</span>
                </v-btn>
                <v-btn flat v-scroll-to="'#peripherals'">
                    <span>PERIPHERALS</span>
                </v-btn>
            </div>
            <div class="hidden-sm-and-down" v-if="selected">
                <v-btn flat @click="backToMenu">
                    <span>Back</span>
                </v-btn>
            </div>
                <v-spacer></v-spacer>
                    
                    <Cart/>
                    <v-btn flat icon @click="darkMode">
                        <v-icon>brightness_medium</v-icon>
                    </v-btn>
            </v-toolbar>
        <drawer class="hidden-md-and-up" @click="drawerOpen"></drawer>
</nav>

</template>
<script>
import Cart from './Cart'
import bus from '../../bus_main.js'
import Drawer from './DrawerGuest.vue'
export default {
    components: {
        Drawer,
        Cart
    },
    data() {
        return {
            hide: true,
        }
    },
    methods: {
        drawerOpen(){
            bus.$emit('drawerOpen', true)
        },
        darkMode(){
            bus.$emit('darkMode', true)
        },
        backToMenu() {
            this.$router.push({path: '/'})
             this.$store.dispatch('removeSelected',)
        }
    },

    // watch: {
    //     $route: function() {
    // // Check if given route is true, if it is then hide Nav.
    //         if (this.$route.path === "/user/foo/posts") {
    //             store.commit('SHOWNAV');
    //         } else  {
    //             store.commit('HIDENAV');
    //         }
    //     }
    // },

    computed: {
        selected() {
            return this.$store.getters.selected
        }
    }
}
</script>
