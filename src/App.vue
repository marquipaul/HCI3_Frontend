<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat>
        <span class="mr-2" v-scroll-to="'#bags'">Bags</span>
      </v-btn>
            <v-btn flat>
        <span class="mr-2" v-scroll-to="'#shirt'">Shirts</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <hello-world/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
