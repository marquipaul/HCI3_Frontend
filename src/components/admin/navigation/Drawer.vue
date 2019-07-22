<template>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
    >
      <v-list class="pt-0" dense>
        <!-- <v-divider light></v-divider> -->
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          router :to="item.route"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

</template>
<script>
import bus from '../../../bus_main.js'
  export default {
    data () {
      return {
        drawer: false,
        items: [
          { title: 'Dashboard', icon: 'dashboard' , route: '/admin/dashboard'},
          { title: 'Products', icon: 'shopping_cart' , route: '/admin/products'},
        ],
      }
    },
    created () {
      var vm = this
      bus.$on('drawerOpen', function (value) {
          if (!vm.drawer) {
              vm.drawer = value
          } else {
              vm.drawer = false
          }
            
      })
    },
  }
</script>

