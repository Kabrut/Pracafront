<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div class="page">

            <div class="form">
                <b-card>
                    <h3><center>Dodaj nauczyciela</center></h3>
                    <b-form >
                        <b-form-group label="Email">
                            <b-form-input v-model="Register.email" type='email' placeholder="Email"/>
                        </b-form-group>
                        <b-form-group label="Imie">
                            <b-form-input v-model="Register.name" type='text' placeholder="Imie"/>
                        </b-form-group>
                        <b-form-group label="Nazwisko">
                            <b-form-input v-model="Register.surname" type='text' placeholder="Nazwisko"/>
                        </b-form-group>
                            <b-form-group label="Hasło">
                                <b-form-input v-model="Register.password" type='password' placeholder="Hasło"/>
                            </b-form-group>
                            <b-form-group label="Powtórz hasło">
                                <b-form-input v-model="Register.password2" type='password' placeholder="Powtórz hasło"/>
                            </b-form-group>
                            <pre/>
                        <label>Dodaj przedmioty które prowadzi nauczyciel</label>
                            <div class="fieldss">
                                <b-card >
                            <b-col lg="10" class="my-1">
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
                                    <b-button variant="outline-info" v-model="row.checkbox" @click="checked(row.item)">Dodaj</b-button>
                                </template>
                            </b-table></b-card>
                                <h1 style="margin-top:5em">⇨</h1>
                       <b-card>
                           <label>Przedmioty wybrane dla nauczyciela</label>
                           <b-table :items="selected" :fields="fields">
                            <template v-slot:cell(button)="row">
                                <b-button variant="outline-danger" @click="clear(row.item)">Usuń</b-button>
                            </template>
                        </b-table></b-card> </div>
                        </b-form-group>
                        <div class="submit">
                            <b-button @click="checkpasswords()" variant="danger">Zarejestruj</b-button>
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
                fields:[{key:'name',label:"Przedmiot"},
                    {key:'button',label: " "}],
                items:[],
                filter: null,
                response: [],
                errors: [],
                selected:[],
                Register: {
                    email: '',
                    name: '',
                    surname: '',
                    password:'',
                    password2: '',
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
                params.append('password', this.Register.password )
                params.append('subjects', JSON.stringify(this.selected))
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
            checkpasswords () {
                if (this.Register.password===this.Register.password2){
                    this.createUser();

                }else {alert('Hasla nie sa zgodne');
                }
            },
            getSubjects() {
                axios.get(`http://localhost:3309/showSubject`).then(response =>{
                    this.items = response.data.reverse()
                }).catch(e =>{this.errors.push("cos nie pyklo")})
            },
            clear(item){
                this.selected.pop(item)
            }
        },
        mounted(){
            this.getSubjects();
        }
    }
</script>

<style scoped>
.fieldss{
    display: flex;
}
    .form{
        width:70%;
        margin-left: 20%;
        margin-bottom: 10px;

    }
    .card{
        border-radius: 25px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>