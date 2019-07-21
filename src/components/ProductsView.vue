<template>
  <v-container>
      <v-layout row wrap id="business" color="green" class="mt-2">
          <v-flex lg12 md12 sm12>
            <h1 class="mt-3 headline">Business Solutions</h1>
          </v-flex>
            <v-flex lg4 md6 sm6 xs12 px-3 my-3 v-for="item in business" :key="item.product_name">
                <v-hover>
                    <v-card slot-scope="{ hover }" :class="`clickable elevation-${hover ? 20 : 10}`">
                        <v-img :src="item.img" aspect-ratio="2"></v-img>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{item.product_name}}</h3>
                                <div> {{item.product_details}} </div>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            ₱{{item.price}}
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-flex>
      </v-layout>

      <v-layout row wrap id="components" color="green" class="mt-2">
          <v-flex lg12 md12 sm12>
            <h1 class="mt-3 headline">Components</h1>
          </v-flex>
            <v-flex lg4 md6 sm6 xs12 px-3 my-3>
                <v-hover>
                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 20 : 10}`">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2"></v-img>
                        <v-card-title>
                            <h1 class="headline">Mouse</h1>
                        </v-card-title>
                    </v-card>
                </v-hover>
            </v-flex>
            <v-flex lg4 md6 sm6 xs12 px-3 my-3>             
                <v-hover>
                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 20 : 10}`">
                        <v-card-title>
                            Mouse
                        </v-card-title>
                    </v-card>
                </v-hover>
            </v-flex>
            <v-flex lg4 md6 sm6 xs12 px-3 my-3>
                <v-hover>
                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 20 : 10}`">
                        <v-card-title>
                            Mouse
                        </v-card-title>
                    </v-card>
                </v-hover>
            </v-flex>
            <v-flex lg4 md6 sm6 xs12 px-3 my-3>             
                <v-hover>
                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 20 : 10}`">
                        <v-card-title>
                            Mouse
                        </v-card-title>
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
              business: [
                  {
                      img: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
                      product_name: 'Hikvision Turbo HD Surveillance Kit with 2TB Seagate SkyHawk (8CH4D4B-2MP-2TB)',
                      product_details: 'Hikvision Turbo HD Surveillance Kit with 2TB Seagate SkyHawk (8CH4D4B-2MP-2TB) Hikvision Turbo HD Surveillance Kit with 2TB Seagate SkyHawk (8CH4D4B-2MP-2TB)',
                      price: '15,500.00',
                      category: 'Business Solution',
                  }
              ]
          }
      },
      mounted() {
            // window.Echo.channel('message-sample')
            // .listen('NewMessage', (e) => {
            //     console.log(e.message);
            // })

            axios.get('/api/product?order_by=name&sort_by=desc&rowsPerPage=5&page=1')
                .then((response) => {
                    console.log(response)
                })
      }
  }
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>
