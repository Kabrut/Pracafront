<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div class="page">

            <div class="form">
                <b-card>
                    <h3><center>Dodaj starostę</center></h3>
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

                        <b-form-group label="Kierunek">
                            <vSelect v-model="selected" label="name" :options="items" placeholder="Wybierz kierunek"/>
                        </b-form-group>
                        <b-form-group label="Grupa ćwiczeniowa">
                            <b-form-input v-model="Register.group" type='group' placeholder="Grupa Ćwiczeniowa"/>
                        </b-form-group>
                        <b-form-group label="Grupa laboratoryjna">
                            <b-form-input v-model="Register.lab" type='lab' placeholder="Grupa laboratoryjna"/>
                        </b-form-group>
                        <b-form-group label="Rok rozpoczęcia studiów">
                            <b-form-input v-model="Register.startyear" type='year' placeholder="Rok rozpoczęcia studiów"/>
                        </b-form-group>
                        <b-form-group label="Rok zakończenia studiów">
                            <b-form-input v-model="Register.endyear" type='year' placeholder="Rok zakończenia studiów"/>
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
                    startyear:'',
                    endyear:''
                }
            }
        },
        components: {Register, vSelect},
        methods:{
            createUser () {
                var year = this.Register.startyear +'/'+this.Register.endyear
                var params = new URLSearchParams();
                params.append('email',this.Register.email)
                params.append('password',this.Register.password)
                params.append('name', this.Register.name )
                params.append('surname', this.Register.surname )
                params.append('field', this.selected.name )
                params.append('group', this.Register.group )
                params.append('year', year )
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
    .page{
        margin-top:10px;
    }
 .form{
     width: 70%;
     margin-left: 20%;
     margin-bottom: 10px;
 }
    .card{
        border-radius: 25px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>