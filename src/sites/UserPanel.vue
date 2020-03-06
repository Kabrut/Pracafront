<template>
    <div class="UserPanel">
    <b-tabs>
        <b-tab title="Ogólne"><global/></b-tab>
        <b-tab title="Lista Studentów"><StudentList/></b-tab>
        <b-tab title="Dodaj post do grupy"><Groups/></b-tab>
       
        <b-tab title="Dodaj liste studentów"> <div class="AddList"><AddStudentList/></div></b-tab>
        <b-tab title="Dodaj starostę grupy"><AddLeader/></b-tab>
        <b-tab title="Dodaj nauczyciela"><add-teacher/></b-tab>
        <b-tab title="Dodaj Kierunek i Przedmiot"><add-field/></b-tab>
    </b-tabs>
    </div>
</template>

<script>
import Groups from '../components/UserPanel/Teacher/Groups'
 import StudentList from '../components/UserPanel/StudentList'
 import Global from '../components/UserPanel/Global'
 import AddStudentList from '../components/UserPanel/AddStudentList'
import AddLeader from "../components/UserPanel/Teacher/AddLeader";
import AddTeacher from "../components/UserPanel/admin/AddTeacher";
import AddField from "../components/UserPanel/admin/AddField";
export default {
    components:{
        AddField,
        AddTeacher,
        AddLeader,
       Global, StudentList, Groups, AddStudentList
    } 
}
</script>

<style scoped>
.UserPanel{
  display:flex;
}
</style>