<template>
    <div class="UserPanel">

    <b-tabs class="tabs" content-class="mt-3">
        <b-tab title="Ogólne"><global/></b-tab>
        <b-tab v-if="role === 'admin'"  title="Lista Użytkowników"><StudentList/></b-tab>
        <b-tab v-if="role !== 'student'"  title="Dodaj post dla kierunku"><Groups/></b-tab>
        <b-tab v-if="role === 'admin' || role === 'teacher'"  title="Dodaj starostę grupy"><AddLeader/></b-tab>
        <b-tab v-if="role === 'admin'" title="Dodaj nauczyciela"><add-teacher/></b-tab>
        <b-tab v-if="role === 'admin'"  title="Dodaj Kierunek"><add-field/></b-tab>
        <b-tab v-if="role === 'admin'"  title="Dodaj Przedmiot"><add-subject/></b-tab>
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
import AddSubject from "../components/UserPanel/admin/AddSubject";
export default {
    data() {
        return {
            role: this.$store.state.user.role.name
        }
    },
    components:{
        AddField,
        AddTeacher,
        AddLeader,
       Global, StudentList, Groups, AddStudentList, AddSubject
    } ,
    }
</script>

<style>
.UserPanel{
  display:flex;

}
    .tabs{
        width:100%;


}
.nav{
    background: #f8f9fa!important;
}

</style>