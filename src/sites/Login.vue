<template>
<div class="page">
    <h3><center>Logowanie</center></h3>
    <div class="form">
        {{cos}}
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
            {{response[0]}}
            {{cos[1]}}
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
      },
        response: '',
        user:'',
        cos: ''
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
           localStorage.email =  this.Login.email;
           localStorage.role = this.response[0];
           localStorage.group = this.response[1];
           localStorage.field = this.response[2];
           localStorage.name = this.response[3];
           localStorage.surname = this.response[4];
           this.$store.dispatch('login', this.Login.email,this.response[0],this.response[1],this.response[2],this.response[3],this.response[4]).then(() => this.$router.push('/'))
        })
        .catch(e => {
          this.errors.push(e)
        })
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