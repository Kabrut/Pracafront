<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div class="page">
            <h3><center>Dodaj nauczyciela</center></h3>
            <div class="form">
                <b-card>
                    <b-form >
                        <b-form-group label="Email">
                            <b-form-input v-model="Register.email" type='email' placeholder="Email"/>
                        </b-form-group>
                        <b-form-group label="Imie">
                            <b-form-input v-model="Register.name" type='text' placeholder="Imie"/>
                        </b-form-group>
                        <b-form-group label="Nazwisko">
                            <b-form-input v-model="Register.surname" type='text' placeholder="Nazwisko"/>
                            <pre/>
                            <b-col lg="6" class="my-1">
                                <b-input-group size="sm">
                                    <b-form-input
                                            v-model="filter"
                                            type="search"
                                            id="filterInput"
                                            placeholder="Wyszukaj przedmiot"
                                    ></b-form-input>
                                    <b-input-group-append>
                                        <b-button :disabled="!filter" @click="filter = ''">Wyczyść</b-button>
                                    </b-input-group-append>
                                </b-input-group>
                        </b-col>
                            <b-table :filter="filter" sticky-header :items="items" :fields="field">
                                <template v-slot:cell(checkbox)="row">
                                    <b-button v-model="row.checkbox" @click="checked(row.item)">Dodaj</b-button>
                                </template>
                            </b-table>
                            <b-table :items="selected" v-model="selected"></b-table>
                        </b-form-group>
                        {{selected}}
                        <div class="submit">
                            <b-button @click="clear()">Wyczyść wybrane przedmioty</b-button>
                            <b-button @click="createUser()">Zarejestruj</b-button>
                        </div>
                    </b-form>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Register from '@/sites/Register'
    export default {
        name: "AddTeacher",
        data () {
            return {
                field:[{key:'name',label:"Przedmiot"},
                    {key: "checkbox",label:"Dodaj"}],
                items:[],
                filter: null,
                response: [],
                errors: [],
                selected:[],
                Register: {
                    email: '',
                    name: '',
                    surname: '',
                }
            }
        },
        components: {Register},
        methods:{
            createUser () {
                var params = new URLSearchParams();
                params.append('email',this.Register.email)
                params.append('name', this.Register.name )
                params.append('surname', this.Register.surname )
                axios.post(`http://localhost:3309/teacher`, params)
                    .then(response => {
                        this.response = response.data
                        console.log(response.data)
                        this.showResponse = true
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            checked(id) {
                this.selected.push(id)
            },
            getSubjects() {
                axios.get(`http://localhost:3309/showSubject`).then(response =>{
                    this.items = response.data.reverse()
                }).catch(e =>{this.errors.push("cos nie pyklo")})
            },
            clear(){
                this.selected = []
            }
        },
        mounted(){
            this.getSubjects();
        }
    }
</script>

<style scoped>

</style>