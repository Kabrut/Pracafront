<template>
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
                            <b-form-input v-model="Register.field" type='field' placeholder="Kierunek"/>
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
    export default {
        name: "AddLeader",
        data () {
            return {
                response: [],
                errors: [],
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
        components: {Register},
        methods:{
            createUser () {
                var params = new URLSearchParams();
                params.append('email',this.Register.email)
                params.append('password',this.Register.password)
                params.append('name', this.Register.name )
                params.append('surname', this.Register.surname )
                params.append('field', this.Register.field )
                params.append('group', this.Register.group )
                params.append('year', this.Register.year )
                params.append('lab', this.Register.lab )

                axios.post(`http://localhost:3309/leader`, params)
                    .then(response => {
                        this.response = response.data
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
            }
        }
    }
</script>

<style scoped>

</style>