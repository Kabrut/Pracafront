<template>
    <div id="app" >

        <b-navbar class="navbarr"  sticky v-if="isLoggedIn">
            <b-navbar-nav acenter >
                <b-nav-item router-link to="/">Posty</b-nav-item>
                <b-nav-item router-link to="/Grades">Oceny</b-nav-item>
                <b-nav-item router-link to="/Mail">Poczta</b-nav-item>
                <b-nav-item router-link to="/Tasks">Zadania</b-nav-item>
                <b-nav-item v-if="role==='student' || role === 'leader'" router-link to="/Posts">Grupa</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item router-link to="/UserPanel">Panel użytkownika</b-nav-item>
                <b-nav-item v-if="isLoggedIn" @click="logout" >Wyloguj</b-nav-item></b-navbar-nav>
        </b-navbar>

    </div>
</template>
<script>
    import axios from 'axios'
    import ChatFriends from "@/components/Chat/ChatFriends";
    export default {

        name: "navbar",
        data(){
            return {
                role: this.$store.state.user.role.name
        }
        },
        computed : {
            isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
            authStatus : function(){ return this.$store.getters.authStatus},


        },

        methods:{
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            },
        },
        mounted(){

            this.role = this.isstudent();
        },
    }
</script>
<style>
.navbarr{
    background-color: rgba(255,255,255,.95)!important;
}

</style>
