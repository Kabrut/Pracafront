<template>
    <div>
        <div class="field">
        <b-card title="Dodaj kierunek" class="card" >
        <b-table sticky-header :items="items">

        </b-table>
        <b-form-input placeholder="Wprowadź nazwę nowego kierunku" v-model="field" type="text"/>
            <pre/>
            <b-button @click="addField" variant="outline-danger">Dodaj</b-button>
        </b-card></div>

    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "AddField",
        data(){
            return{
                items: [],
                items1:[],
                subject: '',
                field: '',
            }
        },
        methods:{
            addField(){
                var params = new URLSearchParams
                params.append('field', this.field)
                axios.post(`http://localhost:3309/addField`,params).then( response => {
                    console.log(response);
                    this.getField()
                }).catch(e =>{this.errors.push("cos nie pyklo")})

            },
            addSubject(){
                var params = new URLSearchParams
                params.append('subject', this.subject)
                axios.post(`http://localhost:3309/addSubject`,params).then( response => {
                    console.log(response);
                    this.getSubject();
                }).catch(e =>{this.errors.push("cos nie pyklo")})

            },
            getSubject() {
                axios.get(`http://localhost:3309/showSubject`).then(response =>{
                    this.items1 = response.data.reverse()
                }).catch(e =>{this.errors.push("cos nie pyklo")})
            },
            getField() {
                axios.get(`http://localhost:3309/showFields`).then(response =>{
                    this.items = response.data.reverse()

                }).catch(e =>{this.errors.push("cos nie pyklo")})
            }
        },
        mounted(){
            this.getField();
            this.getSubject();
        }
    }
</script>

<style scoped>
 .field{
     width:70%;
     margin-left: 20%;
     margin-top:10px;
     margin-bottom: 5px;
     border-radius: 25px;
 }
    .card{
        border-radius: 25px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>