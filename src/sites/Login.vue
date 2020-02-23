<template>
<div class="page">
    <h3><center>Logowanie</center></h3>
    <div class="form">
        <b-card>
    <b-form @submit.prevent="login">
      <b-form-group label="Login">
        <b-form-input v-model="Login.email" type='email' placeholder="Login"/>
      </b-form-group>
      <b-form-group label="Hasło">
        <b-form-input v-model="Login.password" type='password' placeholder="Hasło"/>
      </b-form-group>
      <div class="submit">
      <b-button type='submit' @click="login">Zaloguj</b-button>
      <router-link to="/Register"><b-button>Zarejestruj</b-button></router-link>
      </div>
    </b-form>
        </b-card>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { AUTH_REQUEST } from "../store/auth";
export default {
  data() {
    return {
      Login:{
        password: '',
        email: ''
      }
    }
  },    
  methods: {
  login () {
    var params = new URLSearchParams();
    params.append('email',this.Login.email)
    params.append('password',this.Login.password)

    axios.post(`http://localhost:3309/login`, params)
        .then(response => {
          this.response = response.data
          console.log(response.data)
          this.showResponse = true
            this.$store.dispatch('login',{ email, password}).then(() => this.$router.push('/')).catch(err => console.log(err))
        })
        .catch(e => {
          this.errors.push(e)
        })
    
    const { username, password } = this
    this.$store.dispatch(AUTH_REQUEST, { username, password }).then(()=> {this.$router.push('/')})
  }
  }
  
    
}
</script>

<style scoped>

.page{
    width:30%;
    margin: 21em auto;
    
    
}
.form{
    margin:auto;
}
.btn{
    display: inline-block;
   margin:10px; 
  
}
.submit{
     text-align: center;
}

</style>