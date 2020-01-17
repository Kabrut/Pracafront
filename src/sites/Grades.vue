<template>
<div id="grade">
  
    <GradeList/>
    
</div>
</template>

<script>
    import GradeList from "../components/Grades/GradeList";
    export default {
        name: "Grades",
        components: {GradeList}
    }
</script>

<style scoped>
#grade{
    display:flex;
    
}
</style>