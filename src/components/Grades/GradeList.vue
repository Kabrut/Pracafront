<template>
<div id="grade">
<b-card class="table">
   <b-table striped hover :items="items" :fields="fields" responsive>

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
                {key: 'date', label:'Data'},
                {key: 'comment', label:'Komentarz'},
                {key:'przedmiot.name',label:"Przedmiot"}],
                items:[],
            }
        },
    methods:{
        getGrades(){
            var params = new URLSearchParams;
            params.append('email', localStorage.email)
            axios.get(`http://localhost:3309/getGrades`, {params})
                .then(response => {
                    this.items = response.data.reverse()
                    this.$emit('responseid',this.items)
                })
                .catch(e => {
                    this.errors.push("cos nie pyklo")
                })
        }
},
    mounted(){
        this.getGrades();
    }

}
</script>
<style scoped>
#grade{
    float: right;
    width: 100%;
}
.table{
   width:100%;
}
</style>
      
