<template>
<div id="grades">
  
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
#grades{
    display:flex;
    width: 60%;
    margin-left:10%;
    margin-top:10px;

}
</style>