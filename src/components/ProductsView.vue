<template>
  <v-container>
      <v-layout row wrap id="business" color="green" class="mt-2">
          <v-flex lg12 md12 sm12>
            <h1 class="mt-3 headline">Business Solutions</h1>
          </v-flex>
            <v-flex lg4 md6 sm6 xs12 px-3 my-3 v-for="item in business" :key="item.name" >
                <v-hover>
                    <v-card slot-scope="{ hover }" :class="`clickable elevation-${hover ? 20 : 10}`">
                        <v-img :src="item.full_image" aspect-ratio="2" @click.native="viewProduct(item)"></v-img>
                        <v-card-title primary-title>
                            
                            <v-layout row wrap>
                                <v-flex lg12>
                                    <h3 class="headline mb-0">{{item.name}}</h3>
                                </v-flex>
                                <v-flex lg12>
                                    <div class="text-truncate"> {{item.description}} </div>
                                </v-flex>
                            </v-layout>
                           
                        </v-card-title>
                        
                        <v-card-actions>
                            ₱{{item.price}}
                            <!-- <div class="flex-grow-1"></div> -->
                            <!-- <v-spacer></v-spacer>
                            <v-btn @click="addToCard(item)" :disabled="validateAdd" icon>
                                <v-icon>add_shopping_cart</v-icon>
                            </v-btn> -->
                            </v-card-actions>
                    </v-card>
                </v-hover>
            </v-flex>
      </v-layout>

      <v-layout row wrap id="components" color="green" class="mt-2">
          <v-flex lg12 md12 sm12>
            <h1 class="mt-3 headline">Components</h1>
          </v-flex>
            <v-flex lg4 md6 sm6 xs12 px-3 my-3 v-for="item in components" :key="item.name">
                <v-hover>
                    <v-card @click.native="viewProduct(item)" slot-scope="{ hover }" :class="`clickable elevation-${hover ? 20 : 10}`">
                        <v-img :src="item.full_image" aspect-ratio="2"></v-img>
                        <v-card-title primary-title>
                            <v-layout row wrap>
                                <v-flex lg12>
                                    <h3 class="headline mb-0">{{item.name}}</h3>
                                </v-flex>
                                <v-flex lg12>
                                    <div class="text-truncate"> {{item.description}} </div>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-card-text>
                            ₱{{item.price}}
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-flex>
      </v-layout>

      <v-layout row wrap id="laptops" color="green" class="mt-2">
          <v-flex lg12 md12 sm12>
            <h1 class="mt-3 headline">Laptops</h1>
          </v-flex>
            <v-flex lg4 md6 sm6 xs12 px-3 my-3 v-for="item in laptops" :key="item.name">
                <v-hover>
                    <v-card @click.native="viewProduct(item)" slot-scope="{ hover }" :class="`clickable elevation-${hover ? 20 : 10}`">
                        <v-img :src="item.full_image" aspect-ratio="2"></v-img>
                        <v-card-title primary-title>
                           
                            <v-layout row wrap>
                                <v-flex lg12>
                                    <h3 class="headline mb-0">{{item.name}}</h3>
                                </v-flex>
                                <v-flex lg12>
                                    <div class="text-truncate"> {{item.description}} </div>
                                </v-flex>
                            </v-layout>
                            
                        </v-card-title>
                        <v-card-text>
                            ₱{{item.price}}
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-flex>
      </v-layout>  

        <v-layout row wrap id="peripherals" color="green" class="mt-2">
          <v-flex lg12 md12 sm12>
            <h1 class="mt-3 headline">Peripherals</h1>
          </v-flex>
            <v-flex lg4 md6 sm6 xs12 px-3 my-3 v-for="item in peripherals" :key="item.name">
                <v-hover>
                    <v-card @click.native="viewProduct(item)" slot-scope="{ hover }" :class="`clickable elevation-${hover ? 20 : 10}`">
                        <v-img :src="item.full_image" aspect-ratio="2"></v-img>
                        <v-card-title primary-title>
                            <v-layout row wrap>
                                <v-flex lg12>
                                    <h3 class="headline mb-0">{{item.name}}</h3>
                                </v-flex>
                                <v-flex lg12>
                                    <div class="text-truncate"> {{item.description}} </div>
                                </v-flex>
                            </v-layout>
      
                        </v-card-title>
                        <v-card-text>
                            ₱{{item.price}}
                            <!-- <v-spacer></v-spacer>
                            <v-btn @click="addToCard(item)" :disabled="validateAdd" fab color="success"> <v-icon>cart</v-icon> </v-btn> -->
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-flex>
      </v-layout>        
  </v-container>
</template>

<script>
import axios from 'axios';
  export default {
      data() {
          return {
                business: [],
                components: [],
                laptops: [],
                peripherals: []
          }
      },
      mounted() {
            // window.Echo.channel('message-sample')
            // .listen('NewMessage', (e) => {
            //     console.log(e.message);
            // })

            axios.get('/api/product/shop-view')
                .then((response) => {
                    console.log(response)
                    this.business = response.data.category_1
                    this.components = response.data.category_2
                    this.laptops = response.data.category_3
                    this.peripherals = response.data.category_4
                })
      },
      methods: {
          viewProduct(item) {
              this.$router.push({path: '/product/preview'})
              this.$store.dispatch('selectProduct', item)
              console.log(this.$router.currentRoute.path)
          },
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
    //   computed: {
    //     selectedProduct() {
    //         return JSON.parse(this.$store.getters.retrieveSelectedProduct) 
    //     },
    //     getCart() {
    //         return JSON.parse(this.$store.getters.getCart)
    //     },
    //     validateAdd() {
    //         return JSON.parse(this.$store.getters.getCart).some(product => product.product_id === JSON.parse(this.$store.getters.retrieveSelectedProduct).id)
    //     },
    //     validateQuantity() {
    //         if (this.quantity > 0) {
    //             return false
    //         } else {
    //             return true
    //         }
    //     }
    // }
  }
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>
