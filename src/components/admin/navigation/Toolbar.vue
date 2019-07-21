<template>
    <nav>
        <v-toolbar 
            app
            dense
            fixed
            clipped-left
        >
            <v-toolbar-side-icon @click="drawerOpen"></v-toolbar-side-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>PC</span>
                <span class="font-weight-light">SHOP</span>
            </v-toolbar-title>
                <v-spacer></v-spacer>
        <v-menu offset-y>
            <v-btn flat slot="activator">
                <span>ADMINISTRATOR</span>
                <v-icon left>expand_more</v-icon>
            </v-btn>
            <v-list>
                <v-list-tile>
                    <v-switch v-model="darkMode" primary label="Dark Mode"></v-switch>
                </v-list-tile>
                <v-list-tile @click="logout" >
                    <v-list-tile-title>
                        <v-icon left>exit_to_app</v-icon>
                        <span>Sign Out</span>
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
        </v-toolbar>
        <drawer></drawer>
</nav>

</template>
<script>
import bus from '../../../bus_main.js'
import Drawer from './Drawer.vue'
export default {
    components: {
        Drawer
    },
    data() {
        return {
            darkMode: false,
        }
    },
    methods: {
        drawerOpen(){
            bus.$emit('drawerOpen', true)
        },
        logout() {
            this.$store.dispatch('destroyToken')
              .then(response => {
                  this.$router.push({path: '/admin/login'});
              });
        },
        
    },
    watch: {
        darkMode: function (darkMode) {
            bus.$emit('darkMode', darkMode)
        }
    }
}
</script>
