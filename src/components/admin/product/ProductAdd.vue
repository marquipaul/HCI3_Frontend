<template>
  <v-layout row justify-center>

        <v-snackbar 
            v-model="added" 
            :timeout="4000" 
            bottom 
            right
            multi-line
            color="primary">
            <span>Product successfully added!</span>
            <v-btn flat color="white" @click="added = false">Close</v-btn>
        </v-snackbar>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn round color="primary" dark v-on="on">ADD NEW PRODUCT</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">ADD NEW PRODUCT</span>
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
					<v-text-field label="Select Product Image*" @click='pickFile' v-model='imageName' prepend-icon='attach_file' :rules="imageRules"></v-text-field>
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
          <v-btn flat color="blue darken-1" text @click="submitProduct">Save</v-btn>
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
export default {
    data() {
        return {
            added: false,
            loading: false,
            imageUrl: '',
            imageFile: '',
            imageName: '',
            form: {
                name: '',
                brand_id: '',
                category_id: '',
                price: '',
                description: '',
                full_image: '',
            },
            dialog: false,
            imageRules: [
                v => !!v || 'Product image is required',
            ],   
        }
    },
    methods: {
        pickFile () {
            this.$refs.image.click ()
        },
        onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
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
				this.imageFile = ''
				this.imageUrl = ''
			}
        },
        submitProduct(){
          this.loading = true
            let formData = new FormData()
                    formData.append('name', this.form.name)
                    formData.append('brand_id', this.form.brand_id)
                    formData.append('category_id', this.form.category_id)
                    formData.append('price', this.form.price)
                    formData.append('description', this.form.description)
                    formData.append('full_image', this.form.full_image, this.imageName)

            this.$store.dispatch('addProduct', formData)
                .then((response) => {
                    this.dialog = false
                    this.added = true
                    this.loading = false
                    this.form.name = ''
                    this.form.brand_id = ''
                    this.form.category_id = ''
                    this.form.price = ''
                    this.form.full_image = ''
                    this.form.description = ''
                    this.imageName = ''
                    this.imageUrl = ''
                    console.log(response.data)
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
<style>
/* width */
    ::-webkit-scrollbar {
        width:5px;
        padding-left:10px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        display: none;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #90A4AE;
        border-radius: 50px;
        display: block;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #90A4AE;
        display: block;
    }

</style>