<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div class="page">
            <h3><center>Dodaj starostę</center></h3>
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
                        </b-form-group>
                        <b-form-group label="Kierunek">
                            <vSelect v-model="selected" label="name" :options="items" placeholder="Wybierz kierunek"/>
                        </b-form-group>
                        <b-form-group label="Grupa ćwiczeniowa">
                            <b-form-input v-model="Register.group" type='group' placeholder="Grupa Ćwiczeniowa"/>
                        </b-form-group>
                        <b-form-group label="Grupa laboratoryjna">
                            <b-form-input v-model="Register.lab" type='lab' placeholder="Grupa laboratoryjna"/>
                        </b-form-group>
                        <b-form-group label="Rok">
                            <b-form-input v-model="Register.year" type='year' placeholder="Rok"/>
                        </b-form-group>
                        <div class="submit">
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
    import vSelect from 'vue-select'
    export default {
        name: "AddLeader",
        data () {
            return {
                response: [],
                errors: [],
                selected:[],
                items:[{value:null,text:'Wybierz kierunek'}],
                Register: {
                    email: '',
                    name: '',
                    surname: '',
                    password: '',
                    password2:'',
                    field: '',
                    group: '',
                    lab:'',
                    year:'',
                }
            }
        },
        components: {Register, vSelect},
        methods:{
            createUser () {
                var params = new URLSearchParams();
                params.append('email',this.Register.email)
                params.append('password',this.Register.password)
                params.append('name', this.Register.name )
                params.append('surname', this.Register.surname )
                params.append('field', this.selected )
                params.append('group', this.Register.group )
                params.append('year', this.Register.year )
                params.append('lab', this.Register.lab )

                axios.post(`http://localhost:3309/leader`, params)
                    .then(response => {
                        this.response = response.data.get(name)
                        console.log(response.data)
                        this.showResponse = true
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            checkpasswords () {
                if (this.Register.password===this.Register.password2){
                    this.createUser();

                }else {alert('Hasla nie sa zgodne');
                }
            },
            getFields() {
                axios.get(`http://localhost:3309/showFields`).then(response =>{
                    this.items = response.data
                }).catch(e=>{
                    this.errors.push(e)
                })
            }
        },
        mounted(){
          this.getFields();
        }
    }
</script>

<style scoped>

</style>