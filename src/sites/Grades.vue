<template>
<div id="grades">
  
    <GradeList v-if = "role !== 'teacher'"/>
    <Teachergrades v-if = "role === 'teacher'"/>
    
</div>
</template>

<script>
    import GradeList from "../components/Grades/GradeList";
    import Teachergrades from "../components/Grades/Teachergrades";
    export default {
        name: "Grades",
        components: {GradeList, Teachergrades},
        data() {
            return{
                role: this.$store.state.user.role.name
            }
        }


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