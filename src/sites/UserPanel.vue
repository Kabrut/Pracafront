<template>
    <div class="UserPanel">
    <b-tabs>
        <b-tab title="Ogólne"><global/></b-tab>
        <b-tab title="Lista Studentów"><StudentList/></b-tab>
    </b-tabs>
    </div>
</template>

<script>
 import StudentList from '../components/UserPanel/StudentList'
 import Global from '../components/UserPanel/Global'
export default {
    components:{
       Global, StudentList
    } 
}
</script>

<style scoped>

</style>