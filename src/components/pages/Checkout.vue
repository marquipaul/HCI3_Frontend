<template>
    <v-layout row wrap>
        <v-snackbar
            v-model="snackbar"
            color="success"
            >
            Order Successfully Made
            <v-btn
                color="white"
                text
                @click="snackbar = false"
            >
                Close
            </v-btn>
            </v-snackbar>
        <v-flex lg5 md5 sm12 xs12 class="pa-2">
            <v-card>
                <v-card-title>
                    Ordered Products
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-list v-for="(item, index) in products" :key="index" two-line>
                            <v-list-tile
                            avatar
                            >
                            <v-badge color="blue-grey darken-3 white--text" left>
                                <template v-slot:badge>{{item.quantity}}</template>
                                <v-list-tile-avatar size="50">
                                    <img :src="item.full_image">
                                </v-list-tile-avatar>
                            </v-badge>
                            

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                                <v-list-tile-sub-title>₱{{item.price}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                ₱{{total(item)}}
                            </v-list-tile-action>
                            </v-list-tile>
                            <v-divider></v-divider>
                        
                        </v-list>
                        <v-list>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-sub-title>Total</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    ₱{{subTotal}}
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex lg7 md7 sm12 xs12 class="pa-2">
            <v-card>
                <v-card-title>
                    Shipping Information
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex lg12 md12 sm12 xs12>
                            <p class="text-uppercase grey--text text--darken-2 font-weight-black">Contact Information</p>
                        </v-flex>
                        <v-flex lg6 md6 sm12 xs12 class="pa-2">
                            <p class="grey--text text--darken-2 font-weight-black">E-Mail Address</p>
                            <v-text-field
                                v-model="form.email"
                                style="margin-top: -13px;"
                                solo
                                placeholder="Input E-Mail Address"
                                v-validate="'required|email'"
                                :error-messages="errors.collect('E-Mail')"
                                data-vv-name="E-Mail"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg6 md6 sm12 xs12 class="pa-2">
                            <p class="grey--text text--darken-2 font-weight-black">Mobile Number</p>
                            <v-text-field
                                v-model="form.mobile"
                                style="margin-top: -13px;"
                                solo
                                placeholder="Input Mobile Number"
                                v-validate="'required|numeric|digits:11'"
                                :error-messages="errors.collect('Mobile Number')"
                                data-vv-name="Mobile Number"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row wrap class="mt-4">
                        <v-flex lg12 md12 sm12 xs12>
                            <p class="text-uppercase grey--text text--darken-2 font-weight-black">Shipping Address</p>
                        </v-flex>
                        <v-flex lg6 md6 sm12 xs12 class="pa-2">
                            <p class="grey--text text--darken-2 font-weight-black">First Name</p>
                            <v-text-field
                                v-model="form.first_name"
                                style="margin-top: -13px;"
                                solo
                                placeholder="First Name"
                                v-validate="'required'"
                                :error-messages="errors.collect('First Name')"
                                data-vv-name="First Name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg6 md6 sm12 xs12 class="pa-2">
                            <p class="grey--text text--darken-2 font-weight-black">Last Name</p>
                            <v-text-field
                                v-model="form.last_name"
                                style="margin-top: -13px;"
                                solo
                                placeholder="Last Name"
                                v-validate="'required'"
                                :error-messages="errors.collect('Last Name')"
                                data-vv-name="Last Name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg12 md12 sm12 xs12 class="pa-2">
                            <p class="grey--text text--darken-2 font-weight-black">Street</p>
                            <v-text-field
                                v-model="form.street"
                                style="margin-top: -13px;"
                                solo
                                placeholder="Street"
                                v-validate="'required'"
                                :error-messages="errors.collect('Street')"
                                data-vv-name="Street"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg12 md12 sm12 xs12 class="pa-2">
                            <p class="grey--text text--darken-2 font-weight-black">City / Municipality</p>
                            <v-text-field
                                v-model="form.city_mun"
                                style="margin-top: -13px;"
                                solo
                                placeholder="City / Municipality"
                                v-validate="'required'"
                                :error-messages="errors.collect('City / Municipality')"
                                data-vv-name="City / Municipality"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg12 md12 sm12 xs12 class="pa-2">
                            <p class="grey--text text--darken-2 font-weight-black">State / Province</p>
                            <v-text-field
                                v-model="form.state_prov"
                                style="margin-top: -13px;"
                                solo
                                placeholder="State / Province"
                                v-validate="'required'"
                                :error-messages="errors.collect('State / Province')"
                                data-vv-name="State / Province"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg6 md6 sm12 xs12 class="pa-2">
                            <p class="grey--text text--darken-2 font-weight-black">Country</p>
                            <v-text-field
                                v-model="form.country"
                                style="margin-top: -13px;"
                                solo
                                placeholder="Country"
                                v-validate="'required'"
                                :error-messages="errors.collect('Country')"
                                data-vv-name="Country"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg6 md6 sm12 xs12 class="pa-2">
                            <p class="grey--text text--darken-2 font-weight-black">Zip Code</p>
                            <v-text-field
                                v-model="form.zip_code"
                                style="margin-top: -13px;"
                                solo
                                placeholder="Zip Code"
                                v-validate="'required|numeric'"
                                :error-messages="errors.collect('Zip Code')"
                                data-vv-name="Zip Code"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="submit" :loading="loading" block>Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
export default {
    $_veeValidate: {
      validator: 'new',
    },
    data() {
        return {
            orderedProducts: [],
            form: {},
            loading: false,
            snackbar: false
        }
    },
    methods: {
        total(item) {
            var total = 0
            total = item.price * item.quantity
            return total
        },
        submit() {
            this.$validator.validateAll()
                .then(res => {
                    if (res) {
                        this.submitCheckoutForm()
                    }
                })
        },
        submitCheckoutForm() {
            Vue.set(this.form, 'products', this.orderedProducts)
            this.loading = true
            this.$store.dispatch('addOrder', this.form)
                .then(res => {
                    this.loading = false
                    this.snackbar = true
                    console.log(res)
                })
                .catch(error => {
                    this.loading = false
                })
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