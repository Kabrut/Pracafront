<template>
    <div class="task">

       <Addfile/>
      

       <h2>Ostatnie zadania</h2>
       <Tasks/>
    </div>
</template>
<script>
  import Addfile from "../components/Tasks/Addfile";
   import Tasks from "../components/Tasks/Tasks";
export default {
  components:{
     Addfile, Tasks
  }
}
</script>
<style scoped>
.task{
  display: block;
  align-content:center;
}
</style>