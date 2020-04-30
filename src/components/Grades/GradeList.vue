<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div id="grade">
<b-card class="table">
   <center><h2>Oceny</h2></center>
   <b-table striped hover sort :items="items" :fields="fields" responsive>
      <template v-slot:cell(teacher)="data">
         {{ data.value }}
      </template>
   </b-table striped hover>
</b-card>
</div> 

</template>
<script>
    import axios from "axios";
export default {

    data() {
        return{
            fields: [
                {key: 'grade', label: 'Ocena'},
                {key: 'date', label:'Data',sortable: true},
                {key: 'comment', label:'Komentarz'},
                {key:'przedmiot.name',label:"Przedmiot", sortable: true},
                {key: 'teacher',label: 'Dodane przez',formatter: 'fullname'},
            ],
                items:[],
            }
        },
    methods:{
        getGrades(){
            var params = new URLSearchParams;
            params.append('email', this.$store.state.user.mail)
            axios.get(`http://localhost:3309/getGrades`, {params})
                .then(response => {
                    this.items = response.data.reverse()
                    this.$emit('responseid',this.items)
                })
                .catch(e => {
                    this.errors.push("cos nie pyklo")
                })
        },
       fullname(value){
           return `${value.name} ${value.surname}`
       }
},
    mounted(){
        this.getGrades();
    }

}
</script>
<style scoped>
#grade{
   margin:auto;
   width:100%;
}
.table{
   border-radius: 25px;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
      
