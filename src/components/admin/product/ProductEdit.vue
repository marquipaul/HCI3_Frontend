<template>
  <v-layout row justify-center>

        <v-snackbar 
            v-model="updated" 
            :timeout="4000" 
            bottom 
            right
            multi-line
            color="primary">
            <span>Product successfully updated!</span>
            <v-btn flat color="white" @click="updated = false">Close</v-btn>
        </v-snackbar>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">UPDATE PRODUCT</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md8>
                <v-text-field v-model="form.name" label="Product Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="form.price" label="Product Price*"></v-text-field>
              </v-flex>
            <v-flex xs12 sm6>
                <v-select
                item-text="name"
                item-value="id"
                :items="categories"
                label="Product Category"
                v-model="form.category_id"
                ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
                <v-select
                item-text="name"
                item-value="id"
                :items="brands"
                label="Product Brand"
                v-model="form.brand_id"
                ></v-select>
            </v-flex>
            <v-flex xs12>
                <v-textarea label="Description*" v-model="form.description" required></v-textarea>
              </v-flex>

				<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageUrl" height="150" v-if="imageUrl"/>
					<v-text-field label="Select Product Image*" @click='pickFile' v-model='form.imageName' prepend-icon='attach_file' :rules="imageRules"></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>
				</v-flex> 

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions v-if="!loading">
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn flat color="blue darken-1" text @click="updateProduct">Save</v-btn>
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
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)
//import format from 'date-fns/format'
  export default {
    data(){
      return{
        updated: false,
        loading: false,
        imageName: '',
		imageUrl: '',
		imageFile: '',
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
        due: null,
        nameRules: [
          v => !!v || 'Product name field is required'
        ],
        priceRules: [
          v => !!v || 'Product price field is required',
        ],
        codeRules: [
          v => !!v || 'Product code field is required',
        ],
        unitRules: [
          v => !!v || 'Product unit field is required',
        ],
        unit_typeRules: [
          v => !!v || 'Product unit type field is required',
        ],
        imageRules: [
          v => !!v || 'Product image is required',
        ],    
      }
    },

    created () {
      var vm = this
      bus.$on('dialogEdit', function (value) {
        vm.dialog = value
      })
      bus.$on('product', function (value) {
        vm.form.id = value.id
        vm.form.name = value.name
        vm.form.brand_id = value.brand_id
        vm.form.category_id = value.category_id
        vm.form.price = value.price
        vm.form.description = value.description
        vm.imageUrl = value.full_image
      })
    },

    methods: {
        pickFile () {
            this.$refs.image.click ()
        },
        onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.form.imageName = files[0].name
				if(this.form.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.form.full_image = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.form.full_image = ''
				this.imageUrl = ''
			}
        },
        updateProduct(){   
            this.loading = true             
            this.$store.dispatch('updateProduct', this.form)
                .then((response) => {
                    this.dialog = false
                    this.loading = false
                    this.updated = true
                    this.form.name = ''
                    this.form.brand_id = ''
                    this.form.price = ''
                    this.form.description = ''
                    this.form.category_id = ''
                    this.form.full_image = ''
                    this.form.imageName = ''
                    this.imageUrl = ''
                })
        },
    },
    computed: {
        categories(){
            return this.$store.getters.retrieveCategories
        },
        brands(){
            return this.$store.getters.retrieveBrands
        }
    }
  }
</script>