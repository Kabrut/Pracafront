<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="page">
        <div class="page">
            <h3><center>Rejestracja</center></h3>
            <div class="form">
                <b-card>
                    <b-form >
                        <b-form-group label="Email">
                            <b-form-input v-model="Register.email" type='email' placeholder="Email"/>
                        </b-form-group>
                        <b-form-group label="Hasło">
                            <b-form-input v-model="Register.password" type='password' placeholder="Hasło"/>
                        </b-form-group>
                        <b-form-group label="Powtórz hasło">
                            <b-form-input v-model="Register.password2" type='password' placeholder="Powtórz hasło"/>
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
                            <b-form-select v-model="Register.group" :options="options" placeholder="Grupa Ćwiczeniowa"/>
                        </b-form-group>
                        <b-form-group label="Grupa laboratoryjna">
                            <b-form-select v-model="Register.lab" :options="options" placeholder="Grupa laboratoryjna"/>
                        </b-form-group>
                        <b-form-group label="Rok rozpoczęcia studiów">
                            <b-form-input v-model="Register.startyear" type='year' placeholder="Rok rozpoczęcia studiów"/>
                        </b-form-group>
                        <b-form-group label="Rok zakończenia studiów">
                            <b-form-input v-model="Register.endyear" type='year' placeholder="Rok zakończenia studiów"/>
                        </b-form-group>
                        <div class="submit">
                            <b-button @click="checkpasswords()" class="btn1">Zarejestruj</b-button>

                            <router-link to="/Login"><b-button class="btn1">Powrót</b-button></router-link>
                        </div>
                        <b-alert
                                variant="danger"
                                dismissable
                                v-model="pwds">
                            {{ alertcontent }}
                        </b-alert>
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
                options:[
                    { value:  '1', text:'1'},
                    { value:  '2', text:'2'},
                    { value:  '3', text:'3'},
                    { value:  '4', text:'4'},
                    { value:  '5', text:'5'},
                    { value:  '6', text:'6'},
                    { value:  '7', text:'7'},
                    { value:  '8', text:'8'},
                    { value:  '9', text:'9'},
                    { value:  '10',text: '10'}],
                response: [],
                alertcontent: '',
                pwds: false,
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
                    endyear:'',
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

                axios.post(`http://localhost:3309/addUser`, params)
                    .then(response => {
                        console.log(response.data)
                        if (response.data === false){
                            alertcontent="Użytkownik już istnieje"
                            pwds=true;

                        }
                    })
                    .catch(e => {
                        if (e.response.status === 500){
                            this.alertcontent = "Wprowadzono błędne dane"
                            this.pwds=true;
                        }
                    })
            },
            checkpasswords () {
                if (this.Register.password===this.Register.password2){
                    this.createUser();

                }else {this.alertcontent='Hasla nie sa zgodne';
                this.pwds=true;
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
    width:60%;
    margin: auto;
}
    .submit{
        display: inline-block;
    }
.btn1{
    margin:4px;
}
</style>