<template>
    <div class="page">
    <h3><center>Rejestracja</center></h3>
    <div class="form">
        <b-card>
    <b-form @submit.prevent="register">
      <b-form-group label="Login">
        <b-form-input v-model="email" type='email' placeholder="Login"/>
      </b-form-group>
      <b-form-group label="Hasło">
        <b-form-input v-model="password" type='password' placeholder="Hasło"/>
      </b-form-group>
      <b-form-group label="Potwierdź hasło">
        <b-form-input v-model="repeatpassword" type='password' placeholder="Hasło"/>
      </b-form-group>
      <div class="submit">
      <b-button type='submit'>Zarejestruj</b-button>
      <router-link to="/Login"><b-button>Powrót</b-button></router-link>
      </div>
    </b-form>
        </b-card>
    </div>
</div>
</template>

<script>
export default {
    
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