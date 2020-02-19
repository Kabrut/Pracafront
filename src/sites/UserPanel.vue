<template>
    <div class="UserPanel">
    <b-tabs>
        <b-tab title="Ogólne"><global/></b-tab>
        <b-tab title="Lista Studentów"><StudentList/></b-tab>
        <b-tab title="Dodaj post do grupy"><Groups/></b-tab>
       
        <b-tab title="Dodaj liste studentów"> <div class="AddList"><AddStudentList/></div></b-tab>
    </b-tabs>
    </div>
</template>

<script>
import Groups from '../components/UserPanel/Teacher/Groups'
 import StudentList from '../components/UserPanel/StudentList'
 import Global from '../components/UserPanel/Global'
 import AddStudentList from '../components/UserPanel/AddStudentList'
export default {
    components:{
       Global, StudentList, Groups, AddStudentList
    } 
}
</script>

<style scoped>
.UserPanel{
    width:80%;
}
</style>