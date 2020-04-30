<template>
  <div id="app" >
      <navbar v-if="isLoggedIn"/>
    <div class="Chat">
    <ChatFriends v-if="isLoggedIn"/>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import axios from 'axios'
import ChatFriends from "@/components/Chat/ChatFriends";
  import Navbar from "./components/Navbar";
    export default {

        name: "App",
        components: {Navbar, ChatFriends},
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn
            },
            authStatus: function () {
                return this.$store.getters.authStatus
            },

        },

        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        },
        created() {
            this.logout();
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

  #app{


  }

</style>
