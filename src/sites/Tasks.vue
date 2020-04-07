<template>
    <div class="task">

       <Addfile v-if="role === 'teacher'"/>
      

       <h2>Ostatnie zadania</h2>
       <Tasks/>
    </div>
</template>
<script>
  import Addfile from "../components/Tasks/Addfile";
   import Tasks from "../components/Tasks/Tasks";
export default {
    data(){
        return{
            role: this.$store.state.user.role.name,
        }
    },
  components:{
     Addfile, Tasks
  }
}
</script>
<style scoped>
.task{
  display: block;
  align-content:center;
    width:60%;
    margin-right:auto;
    margin-left:10%;
}
</style>