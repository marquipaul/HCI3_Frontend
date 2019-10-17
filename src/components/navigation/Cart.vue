<template>
    <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="350"
    offset-x
    >
    <template v-slot:activator="{ on }">
        
            <v-btn flat icon v-on="on">
                <v-badge color="blue-grey darken-3 white--text" left>
                    <template v-slot:badge>{{products.length}}</template>
                    <v-icon>shopping_cart</v-icon>
                </v-badge>
            </v-btn>
        

    </template>

    <v-card>
        <v-list v-for="(product, index) in orderedProducts" :key="index">
        <v-list-tile avatar>
            <v-list-tile-avatar>
            <img :src="product.full_image" :alt="product.name">
            </v-list-tile-avatar>

            <v-list-tile-content>
            <v-list-tile-title>
               <p>{{product.name}}</p> 

            </v-list-tile-title>
            <v-list-tile-sub-title>₱{{product.price}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
                <v-layout row wrap justify-end>
                    <v-flex lg2 md4 sm4 xs4 class="pr-2">    
                         <v-text-field
                            v-model="product.quantity"
                            single-line
                            filled
                            type="number"
                        ></v-text-field>
                    </v-flex>
                    <v-flex lg1 md2 sm2 xs2 class="pl-2">
                        <v-btn @click="removeItem(index)" class="mt-3" icon flat small color="red white--text"><v-icon>cancel</v-icon></v-btn>
                    </v-flex>
                </v-layout>
            </v-list-tile-action>
        </v-list-tile>
        </v-list>

        <v-divider></v-divider>
        <v-list>
        <v-list-tile>

            <v-list-tile-content>
            <v-list-tile-title>
               <p class="grey--text">Total</p>
            </v-list-tile-title>
            </v-list-tile-content>
                
            <v-list-tile-action>
                ₱{{subTotal}}
            </v-list-tile-action>
        </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
        <v-btn @click="checkout" :disabled="products==0" block color="blue-grey darken-3 white--text" large>Checkout</v-btn>
        </v-card-actions>
    </v-card>
    </v-menu>
</template>
<script>
export default {
    data() {
        return {
            menu: false,
            orderedProducts: []
        }
    },
    created() {
        //this.orderedProducts = this.products
    },
    watch: {
        orderedProducts: {
            handler() {
                this.$store.dispatch('checkout', this.orderedProducts)
            },
            deep: true
        }
    },
    methods: {
        removeItem(index) {
            this.$store.dispatch('removeToCart', index)
            this.orderedProducts.splice(index, 1)
        },
        checkout() {
            this.$store.dispatch('checkout', this.orderedProducts)
            window.open(`http://${window.location.hostname}:8080/checkout`, "_blank");
        }
    },
    computed: {
        products() {
            this.orderedProducts = JSON.parse(this.$store.getters.getCart)
            return JSON.parse(this.$store.getters.getCart)
        },
        subTotal() {
            var total = 0
            this.orderedProducts.forEach(function(product) {
               total = product.price * product.quantity + total
            });
            return total
        }
    }
}
</script>