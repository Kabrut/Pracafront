<template>

  <div class="home">
    <h2>{{localfield}}</h2>
    <HomePost/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import HomePost from '@/components/HomePage/HomePost.vue'
export default {
  data(){
    return{
    localfield: localStorage.field,
    }
  },
  computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
  name: 'home',
  components: {
    HomePost
  }
}
</script>
<style scoped>
.home{
  width:auto;
}
</style>
