<template>
    <div class="page">
    <h3><center>Rejestracja</center></h3>
    <div class="form">
        <b-card>
    <b-form >
      <b-form-group label="Email">
        <b-form-input v-model="Register.email" type='email' placeholder="Email"/>
      </b-form-group>
      <b-form-group label="Imie">
        <b-form-input v-model="Register.name" type='text' placeholder="Imie"/>
      </b-form-group>
      <b-form-group label="Nazwisko">
        <b-form-input v-model="Register.surname" type='text' placeholder="Nazwisko"/>
      </b-form-group>
      <b-form-group label="Hasło">
        <b-form-input v-model="Register.password" type='password' placeholder="Hasło"/>
      </b-form-group>
      <b-form-group label="Potwierdź hasło">
        <b-form-input v-model="Register.password2" type='password' placeholder="Hasło"/>
      </b-form-group>
      <b-form-group label="Kierunek">
        <b-form-input v-model="Register.field" type='field' placeholder="Kierunek"/>
      </b-form-group>
      <b-form-group label="Grupa">
        <b-form-input v-model="Register.group" type='group' placeholder="Grupa"/>
      </b-form-group>
      <div class="submit">
      <b-button @click="checkpasswords()">Zarejestruj</b-button>
      <router-link to="/Login"><b-button>Powrót</b-button></router-link>
      </div>
    </b-form>
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
      Register: {
        email: '',
        name: '',
        surname: '',
        password: '',
        password2:'',
        field: '',
        group: ''
      }
    }
  },
  methods: {
    createUser () {
      var params = new URLSearchParams();
      params.append('email',this.Register.email)
      params.append('password',this.Register.password)
      params.append('name', this.Register.name )
      params.append('surname', this.Register.surname )
      params.append('field', this.Register.field )
      params.append('group', this.Register.group )

      axios.post(`http://localhost:3309/user`, params)
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
        this.createUser();
        
      }else {alert('Hasla nie sa zgodne');
      }
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