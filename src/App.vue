<template>
  <div id="app">
     
    <div id="nav">
      <router-link to="/"><p>Home</p></router-link> 
      <router-link to="/Grades"><p>Grades</p></router-link>
      <router-link to="/Mail"><p>Mail</p></router-link> 
      <router-link to="/Tasks"><p>Tasks</p></router-link>
      <router-link to="/Login"><p>Login</p></router-link>
      <router-link to="/Posts"><p>Posts</p></router-link>
      <router-link to="/UserPanel"><p>UserPanel</p></router-link>
      <p @click="Logout()">Logout</p>
    </div>
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
  top: 3em;
}
#nav p{
  display:inline!important;
  background:gray;
  padding:20px;
  margin:3px;
}
#nav{
  text-align: center;
  background: #0033a0;
  height:3em;
  padding:1px;
}

</style>
