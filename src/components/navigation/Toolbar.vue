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
            <div class="hidden-sm-and-down">
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
                <v-spacer></v-spacer>
                    <v-btn flat icon @click="darkMode">
                        <v-icon>brightness_medium</v-icon>
                    </v-btn>
                    <v-btn flat icon>
                        <v-icon>shopping_cart</v-icon>
                    </v-btn>
            </v-toolbar>
        <drawer class="hidden-md-and-up" @click="drawerOpen"></drawer>
</nav>

</template>
<script>
import bus from '../../bus_main.js'
import Drawer from './DrawerGuest.vue'
export default {
    components: {
        Drawer
    },
    methods: {
        drawerOpen(){
            bus.$emit('drawerOpen', true)
        },
        darkMode(){
            bus.$emit('darkMode', true)
        },
    }
}
</script>
