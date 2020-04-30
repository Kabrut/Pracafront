<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="grade">

        <b-card class="table1">
            <center><h2>Oceny</h2></center>
            <b-table striped hover sort :items="items2" :fields="fields2" responsive>
                <template v-slot:cell(button)="row">
                    <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                        {{ row.detailsShowing ? 'Ukryj' : 'Pokaż'}}
                    </b-button>
                </template>
                    <template v-slot:row-details="row">
                        <b-card>
                            <b-table striped hover :filter-included-fields="comment" :filter="Dyskretna" :items="items" :fields="fields1" >
                                <template v-slot:cell(student)="data">
                                    {{ data.value}}
                                </template>
                                <template v-slot:cell(przedmiot)="data" >
                                    <p v-if="data.value === row.item.name">
                                    {{ data.value}}</p>
                                </template>
                            </b-table>
                        </b-card>
                    </template>
            </b-table>
        </b-card>
    </div>

</template>
<script>
    import axios from "axios";
    export default {

        data() {
            return{
                fields1: [
                    {key: 'grade', label: 'Ocena'},
                    {key: 'date', label:'Data',sortable: true},
                    {key: 'comment', label:'Komentarz'},
                    {key: 'przedmiot', label:'Przedmiot', formatter: this.fieldd, filterByFormatted: true },
                    {key: 'student',label: 'Student',formatter: this.fullname1}
                ],
                items:[],
                fields2:[
                    {key: 'name', label:'Przedmiot', sortable: true},
                    {key:'button', label:' '}
                ],
                items2: this.$store.state.user.subject,
                filterOn: [{key: 'przedmiot.name', label:'Przedmiot'}]
            }

        },
        methods:{
            getGrades(){
                var params = new URLSearchParams;
                params.append('email', this.$store.state.user.mail)
                axios.get(`http://localhost:3309/getGradess`, {params})
                    .then(response => {
                        this.items = response.data.reverse()
                        this.$emit('responseid',this.items)
                    })
                    .catch(e => {
                        this.errors.push("cos nie pyklo")
                    })
            },
            fullname1(value){
                return `${value.name} ${value.surname}`
            },
            filters(value){
                this.filter=value
                return value
            },
            fieldd(value){
                return `${value.name}`
            }

        },
        mounted(){
            this.getGrades();
        }

    }
</script>
<style scoped>
    #grade{
        margin:auto;
        width:100%;
    }
    .table1{
        border-radius: 25px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>

