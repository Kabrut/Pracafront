<template>
<div class="page">

    <h3 class="text"><center>Logowanie</center></h3>
    <div class="form">
        {{cos}}
        <b-card>
    <b-form @submit.prevent="login">
      <b-form-group class="text" label="Login">
        <b-form-input required v-model="email" type='email' placeholder="Login"/>
      </b-form-group>
      <b-form-group class="text" label="Hasło">
        <b-form-input required v-model="password" type='password' placeholder="Hasło"/>
      </b-form-group>
      <div class="submit">
      <b-button variant="outline-light" type='submit' @click="login">Zaloguj</b-button>

      <router-link to="/Register"><b-button variant="outline-light">Zarejestruj</b-button></router-link>
          <b-alert variant="danger"
                   dismissable
                   v-model="alert"
                   > Wprowadzono błędny email lub hasło</b-alert>
      </div>
    </b-form>

        </b-card>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {

        password: '',
        email: '',

        response: '',
        user:'',
        cos: '',
        alert: false,
    }
  },    
  methods: {
  login () {
     var params = new URLSearchParams;
     params.append("mail", this.email)
     params.append("password", this.password)
      this.$store.dispatch('login', params).then(()=>{
          this.$router.push("/")
      }).catch(e=>{
          this.alert= true;
      })

    // var params = new URLSearchParams();
    // params.append('email',this.Login.email)
    // params.append('password',this.Login.password)
    // let vm = this;
    // axios.post(`http://localhost:3309/login`, params)
    //     .then(response => {
    //       this.response = response.data
    //       console.log(response.data)
    //       this.showResponse = true
    //        localStorage.email =  this.Login.email;
    //        localStorage.role = this.response[0];
    //        localStorage.group = this.response[1];
    //        localStorage.field = this.response[2];
    //        localStorage.name = this.response[3];
    //        localStorage.surname = this.response[4];
    //        localStorage.year = this.response[5];
    //        localStorage.lab = this.response[6];
    //        localStorage.Subject = this.response[7];
    //
    //
    //     }).then(this.$router.push('/'))
    //     .catch(e => {
    //      console.log(e)
    //     })
  }
  }
  
    
}
</script>

<style scoped>

.page{
    width:30%;
    margin: 21em auto;
    /*background-color: rgba(100,149,237,.6);*/
    background-color: rgba(0,0,0,.8);
    padding:25px;
    border-radius: 25px;

    
}
.form{
    margin:auto;
    opacity: 1!important;
}
.btn{
    display: inline-block;
   margin:10px; 
  
}
.submit{
     text-align: center;
}
.card{
    background-color: transparent;
}
.text{
    color:white;
}
</style>