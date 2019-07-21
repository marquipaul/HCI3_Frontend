<template>
<div>
        <v-snackbar v-model="admin_error" :timeout="4000" top right multi-line="multi-line" color="error">
            <span>{{error_content}}</span>
            <v-btn flat color="white" @click="admin_error = false">Close</v-btn>
        </v-snackbar>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Admin Portal</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="form.username" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field v-model="form.password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
            <v-card-actions>
                <v-btn block color="primary" @click="authenticate" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      </div>
</template>

<script>
  export default {
    data(){
        return {
            loading: false,
            error_content: '',
            admin_error: false,
            isLoading: false,
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        authenticate() {
            this.loading = true
            this.$store.dispatch('retrieveToken', this.$data.form)
            .then(response => {
                this.loader = false
                this.loading = false
                this.$router.push({path: '/dashboard'});
                //console.log(response)
            }).catch(error => {
                this.error_content = error.response.data
                this.admin_error = true
                this.loading = false
                })
            },
    }
  }
</script>