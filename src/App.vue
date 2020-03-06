<template>
  <div id="app">

    <b-navbar variant="light" sticky type="light" >
      <b-navbar-nav acenter >
        <b-nav-item router-link to="/">Home</b-nav-item>
        <b-nav-item router-link to="/Grades">Grades</b-nav-item>
        <b-nav-item router-link to="/Mail">Mail</b-nav-item>
        <b-nav-item router-link to="/Tasks">Tasks</b-nav-item>
        <b-nav-item router-link to="/Login">Login</b-nav-item>
        <b-nav-item router-link to="/Posts">Posts</b-nav-item>


      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item router-link to="/UserPanel">Panel użytkownika</b-nav-item>
      <b-nav-item  @click="Logout">Logout</b-nav-item></b-navbar-nav>
    </b-navbar>

    <div class="Chat">
    <ChatFriends/>
    </div>
    <router-view/>
  </div>
</template>
<script>
import ChatFriends from "@/components/Chat/ChatFriends";
    export default {
        name: "App",
        components: {ChatFriends},
      methods:{
          Logout(){
            localStorage.clear();
            this.$router.push("/Login");
          }
      }
    }
</script>
<style>
.Chat{
  display:flex;
  float:right;
  background-color:rgba(0,0,0,.03);
  min-height: 95vh;
  position: sticky;
  top: 1em;
}


</style>
