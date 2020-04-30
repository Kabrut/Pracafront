<template>
  <div class="home">

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

    }
  },
}
</script>
<style scoped>
.home{
  width:auto;
}
</style>
