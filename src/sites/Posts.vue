<template>

    <div class="posts">
        <h1 class="text"> Grupa {{group}}, {{field}} {{year}}</h1>
    <Post/>
    </div>
</template>

<script>
import Post from "../components/Post/Post";
export default {
   
  name: 'posts',
  components: { Post

  },
  data(){
      return{
        group: this.$store.state.user.groups,
          year: this.$store.state.user.year,
          field: this.$store.state.user.field.name,
      }
  }
}
</script>

<style scoped>
.posts{
width: 50%;
    margin-left:12%;

}
    .text{
        color:white;
    }
</style>