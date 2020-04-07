<template>
  <div class="home">
    <center><h2>Posty grupy {{localfield}} {{localyear}}</h2></center>
    <HomePost/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePost from '../components/HomePage/HomePost.vue'
export default {
  name: 'home',
  components: {
    HomePost
  },
  data(){
    return{
    localfield: this.$store.state.user.field.name,
      localyear: this.$store.state.user.year,
    }
  },
}
</script>
<style scoped>
.home{
  width:auto;
}
</style>
