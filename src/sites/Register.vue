<template>
    <div class="page">
    <h3>Rejestracja</h3>
    <div class="form">
        <b-card>
    <b-form >
      <b-form-group label="Email">
        <b-form-input v-model="email" type='email' placeholder="Email"/>
      </b-form-group>
        <b-button class="submit" v-if="!userchecked" @click="getUser">Sprawdź</b-button>
        <div class="form"  v-if="userchecked">
      <b-form-group label="Imie">
        <b-form-input v-model="Register.name" readonly type='text' placeholder="Imie"/>
      </b-form-group>
      <b-form-group label="Nazwisko">
        <b-form-input v-model="Register.surname" readonly type='text' placeholder="Nazwisko"/>
      </b-form-group>
      <b-form-group label="Hasło">
        <b-form-input v-model="password" type='password' placeholder="Hasło"/>
      </b-form-group>
      <b-form-group label="Potwierdź hasło">
        <b-form-input v-model="password2" type='password' placeholder="Hasło"/>
      </b-form-group>
      <b-form-group label="Kierunek">
        <b-form-input v-model="Register.field" readonly type='field' placeholder="Kierunek"/>
      </b-form-group>
      <b-form-group label="Grupa">
        <b-form-input v-model="Register.groups" readonly type='group' placeholder="Grupa"/>
      </b-form-group>
        </div>
      <div class="submit" >
      <b-button v-if="userchecked" @click="checkpasswords">Zarejestruj</b-button>
      <router-link to="/Login"><b-button>Powrót</b-button></router-link>
      </div>
    </b-form>
            {{password}}
        </b-card>
    </div>
</div>
</template>

<script>
import axios from 'axios'  
export default {
   
  data () {
    return {
        response: [],
        errors: [],
        userchecked: false,
        Register: [],
        email:'',
        password:'',
        password2:''
    }
  },
  methods: {
    createUser () {
      var params = new URLSearchParams();
      params.append('email',this.email)
        params.append('password', this.password)

      axios.post(`http://localhost:3309/addPassword`, params)
        .then(response => {
          this.response = response.data
          console.log(response.data)
          this.showResponse = true
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    checkpasswords () {
      if (this.Register.password===this.Register.password2){
          console.log(this.password2)
          console.log(this.password)
        this.createUser();
        
      }else {alert('Hasla nie sa zgodne');
      }
    },
      getUser(){
        var params = new URLSearchParams;
        params.append('email',this.email)
          axios.get(`http://localhost:3309/getUser`,{params})
              .then(response => {
                  this.userchecked = true
              this.Register = response.data
              console.log(response.Register)

          })
              .catch(e => {
                  this.errors.push("cos nie pyklo")
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