<template>
    <div class="field">
        <b-card title="Dodaj Przedmiot">
            <b-table sticky-header :items="items1"></b-table>
            <b-form-input v-model="subject" type="text"/>
            <pre/>
            <b-button @click="addSubject" variant="outline-danger">Dodaj</b-button>
        </b-card>
    </div>

</template>

<script>
import axios from "axios"
    export default {
        name: "AddSubject",
        data(){
            return{
                items1:[],
                subject: '',
                field: '',
            }
        },
        methods:{

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
            }},
        mounted(){
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