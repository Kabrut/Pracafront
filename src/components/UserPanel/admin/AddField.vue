<template>
    <div>
        <b-card title="Dodaj kierunek">
        <b-table sticky-header :items="items">

        </b-table>
        <b-form-input v-model="field" type="text"/>
            <pre/>
            <b-button @click="addField" variant="outline-info">Dodaj</b-button>
        </b-card>
        <b-card title="Dodaj Przedmiot">
            <b-table sticky-header :items="items1"></b-table>
            <b-form-input v-model="subject" type="text"/>
            <pre/>
            <b-button @click="addSubject" variant="outline-info">Dodaj</b-button>
        </b-card>
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

</style>