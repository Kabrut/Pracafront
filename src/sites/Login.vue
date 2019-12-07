<template>
<div class="page">
    <h3><center>Logowanie</center></h3>
    <div class="form">
        <b-card>
    <b-form @submit.prevent="login">
      <b-form-group label="Login">
        <b-form-input type='email' placeholder="Login"/>
      </b-form-group>
      <b-form-group label="Hasło">
        <b-form-input type='password' placeholder="Hasło"/>
      </b-form-group>
      <div class="submit">
      <b-button type='submit'>Zaloguj</b-button>
      <router-link to="/Register"><b-button>Zarejestruj</b-button></router-link>
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