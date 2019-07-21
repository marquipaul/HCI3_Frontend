<template>
  <v-app :dark="dark">
    <toolbar v-if="!adminLoggedin && this.$route.path != '/admin/login'"></toolbar>
    <toolbar-admin v-else-if="adminLoggedin && this.$route.path != '/admin/login'"></toolbar-admin>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import bus from './bus_main.js'
import Toolbar from './components/navigation/Toolbar.vue'
import ToolbarAdmin from './components/admin/navigation/Toolbar.vue'
export default {
  name: 'App',
  components: {
    Toolbar,
    ToolbarAdmin
  },
  data () {
    return {
      dark: false
    }
  },
  created () {
      var vm = this
      bus.$on('darkMode', function (value) {
          if (!vm.dark) {
              vm.dark = value
          } else {
              vm.dark = false
          }
            
      })
      //console.log(this.$route.path, this.$route.fullPath)
    },
    computed: {
      adminLoggedin() {
        return this.$store.getters.loggedIn
      }
    }
}
</script>
