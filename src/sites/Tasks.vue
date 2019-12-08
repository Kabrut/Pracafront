<template>
    <div class="task">
       <Addfile/>
       <Tasks/>
    </div>
</template>
<script>
  import Addfile from "../components/Addfile";
   import Tasks from "../components/Tasks";
export default {
  components:{
     Addfile, Tasks
  }
}
</script>
<style scoped>
.task{
  display: flex;
}
</style>