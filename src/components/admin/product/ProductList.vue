<template>
<v-layout wrap>
    <v-flex lg12>
  <v-card>
    <v-card-title>
        <div class="text-xs-center">
            <!-- <v-btn round color="primary" dark>ADD NEW PRODUCT</v-btn> -->
            <add-product></add-product>
        </div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="retrievedProducts"
      :loading="loading"
      :rows-per-page-items="rowsPerPageItems"
      :total-items="totalRows"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-left"> <v-img class="product-image" :src="props.item.full_image"></v-img></td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.price }}</td>
        <td class="text-xs-left">{{ props.item.category_name }}</td>
        <td class="text-xs-left">{{ props.item.brand_name }}</td>
        <td class="text-xs-center"> 
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn  @click="editProduct(props.item)" color="primary" fab small dark v-on="on">
                        <v-icon>edit</v-icon>
                    </v-btn>
                </template>
                <span>Edit Product</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn @click="deleteProduct(props.item)" color="red" fab small dark v-on="on">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </template>
                <span>Delete Product</span>
            </v-tooltip>
        </td>
      </template>
        <!-- <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template> -->
    </v-data-table>
  </v-card>
  <delete-product @clicked="deleteProduct"></delete-product>
  <edit-product @clicked="editProduct"></edit-product>
  </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
import AddProduct from './ProductAdd.vue'
import EditProduct from './ProductEdit.vue'
import DeleteProduct from './ProductDelete.vue'
import bus from '../../../bus_main.js'
  export default {
    components: {
      AddProduct,
      EditProduct,
      DeleteProduct
      },
    data () {
      return {
        search: '',
        page: {
          current_page: 1,
          page_row_count: 5,
          page_length: 0
        },
        totalRows: 0,
        items: [
            { title: 'Edit' },
            { title: 'Delete' }
        ],
        //totalProducts: 0,
        //products: [],
        loading: true,
        pagination: {},
        headers: [
          { text: 'Image', align: 'center', value: 'full_image', sortable: false},
          { text: 'Name', value: 'name', align: 'center', sortable: true},
          { text: 'Price', value: 'price', align: 'center', sortable: true},
          { text: 'Category', value: 'category_name', align: 'center', sortable: true},
          { text: 'Brand', value: 'brand_name', align: 'center', sortable: true},
          { text: 'Actions', value: '', align: 'center', sortable: true}
        ],
        rowsPerPageItems: [5, 10, 20, 50, 100],
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      },
      search: {
        handler () {
          setTimeout(() => {
          this.getDataFromApi()
          }, 1000)
        },
        deep: true
      }
    },
    mounted () {
        this.$store.dispatch('retrieveCategories')
        this.$store.dispatch('retrieveBrands')
        this.getDataFromApi()
    },
    methods: {
        editProduct(item){
            bus.$emit('dialogEdit', true)
            bus.$emit('product', item)
        },
        deleteProduct(item){
            bus.$emit('dialogDelete', true)
            bus.$emit('product', item)
        },
      getDataFromApi () {
        const { sortBy, descending, page, rowsPerPage } = this.pagination
        
          this.loading = true
          let params = {
            current_page: this.pagination.page,
            search: this.search,
            per_page: this.pagination.rowsPerPage,
            sortBy: this.pagination.sortBy,
            descending: this.pagination.descending,
          }
          this.$store.dispatch('retrieveProducts', params)
              .then((response) => {
                this.loading = false
                this.totalRows = response.data.total
              })
          
        },
    },
    computed: {
      retrievedProducts() {
        return this.$store.getters.retrieveProducts
      }
    }
  }
</script>
<style scoped>
.product-image{
  margin: auto;
  display: block;
  width: 50%;
}
</style>