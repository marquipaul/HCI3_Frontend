<template>
  <v-layout row justify-center>
        <v-snackbar 
            v-model="deleted" 
            :timeout="4000" 
            bottom 
            right
            multi-line
            color="primary">
            <span>Product successfully deleted!</span>
            <v-btn flat color="white" @click="deleted = false">Close</v-btn>
        </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <!-- <v-card-title class="headline">Are you sure?</v-card-title> -->
        <v-card-text>Do you want to delete this Product?</v-card-text>

        <v-card-actions v-if="!loading">
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="deleteProduct">Yes</v-btn>
          <v-btn color="red" flat @click="dialog = false">No</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
            <v-progress-linear
                indeterminate
                height="3"
                color="primary"
                class="mb-0"
            ></v-progress-linear>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import bus from '../../../bus_main.js'
  export default {
    data () {
      return {
        form: {
            id: '',
            name: '',
            brand_id: '',
            category_id: '',
            price: '',
            full_image: '',
            description:'',
            imageName: '',
        },
        dialog: false,
        deleted: false,
        loading: false,
      }
    },
    created () {
      var vm = this
      bus.$on('dialogDelete', function (value) {
        vm.dialog = value
      })
      bus.$on('product', function (value) {
        vm.form.id = value.id
        vm.form.name = value.name
        vm.form.brand_id = value.brand_id
        vm.form.price = value.price
        vm.form.category_id = value.category_id
        vm.form.description = value.description
        vm.imageUrl = value.image_full
      })
    },

    methods: {
        deleteProduct(){
            this.loading = true
            this.$store.dispatch('deleteProduct', this.form)
                .then(response => {
                    console.log(response)
                    this.dialog = false
                    this.deleted = true
                    this.loading = false
                })
        }
    }
  }
</script>