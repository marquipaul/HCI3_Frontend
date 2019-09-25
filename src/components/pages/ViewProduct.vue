<template>
    <v-layout row wrap justify-center>
        <v-flex lg5 md5 sm12 xs12 class="pa-5">
            <v-card class="elevation-10">
                <v-card-text>
                    <v-img :src="selectedProduct.full_image" aspect-ratio="2"></v-img>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex lg5 md5 sm12 xs12 class="pa-5">

                <h1 class="display-2 font-weight-bold">{{selectedProduct.name}}</h1>    
                <h3 class="grey--text headline">₱{{selectedProduct.price}}</h3>
            <v-layout row wrap justify-center>
                <v-flex lg6 md6 sm12 xs12>
                     <v-text-field
                        v-model="quantity"
                        label="Quantity"
                        type="number"
                        :disabled="validateAdd"
                    ></v-text-field>
                </v-flex>
                <v-flex lg12 md12 sm12 xs12>
                     <v-btn :disabled="validateAdd||validateQuantity" @click="addToCard(selectedProduct)" large block color="blue-grey darken-3 white--text">ADD TO CART</v-btn>
                </v-flex>
                <v-flex lg12 md12 sm12 xs12 class="mt-3">
                    <v-divider></v-divider>
                </v-flex>
                <v-flex lg12 md12 sm12 xs12 class="mt-3">
                    <p>{{selectedProduct.description}}</p>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    data() {
        return {
            quantity: 1,
            validate: false,
        }
    },
    methods: {
        addToCard(item) {
            var product = {
                product_id: item.id,
                full_image: item.full_image,
                name: item.name,
                price: item.price,
                quantity: this.quantity
            }
            this.$store.dispatch('addToCart', product)
        },
        
    },

    computed: {
        selectedProduct() {
            return JSON.parse(this.$store.getters.retrieveSelectedProduct) 
        },
        getCart() {
            return JSON.parse(this.$store.getters.getCart)
        },
        validateAdd() {
            return JSON.parse(this.$store.getters.getCart).some(product => product.product_id === JSON.parse(this.$store.getters.retrieveSelectedProduct).id)
        },
        validateQuantity() {
            if (this.quantity > 0) {
                return false
            } else {
                return true
            }
        }
    }
}
</script>