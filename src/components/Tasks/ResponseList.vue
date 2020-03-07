<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <b-button  v-b-toggle.collapse-1 :key='child' variant="primary">Pokaż rozwiązania</b-button>
        <b-collapse id="collapse-1" class="mt-2">
            <b-card>
                <b-table :items = "child.response"   :fields="fields">
                <template v-slot:cell(button)="row">
                    <b-button  v-on:click="fileConverts(row.item.file, row.item.filetype, row.item.filename)" variant="outline-info">
                        {{row.item.filename}}<img src="@/assets/download.png"/>
                    </b-button>
                </template>
                    <template v-slot:cell(dropdown)="row">
                        <b-form-select v-model="grade" :options="options"></b-form-select>
                    </template>
                    <template v-slot:cell(comment)="row">
                        <b-form-textarea v-model="comment"></b-form-textarea>
                    </template>
                    <template v-slot:cell(checkbox)="row">
                        <b-form-checkbox></b-form-checkbox>
                    </template>
                    <template v-slot:cell(grade) = "row">
                        <b-button @click="addGrade" variant="outline-danger">Dodaj ocenę</b-button>
                    </template>
                </b-table>

            </b-card>

        </b-collapse>
    </div>
</template>

<script>
    import axios from 'axios'
    import {base64ToArrayBuffer,saveByteArray} from "./filedownload.js"

    export default {
        name: "ResponseList",
        data(){
            return{
                items:[],
                fields:[
                    {key: 'checkbox', label:" "},
                    {key: 'user.name', label: "imie" },
                    {key: 'user.surname',label: "nazwisko"},
                     {key: 'button', label:"załącznik"},
                    {key: 'dropdown', label:"ocena"},
                    {key:'comment', label:" Komentarz "},
                    {key:'grade', label:" "},
                ],
                selected:null,
                grade: null,
                options:[
                    {value:'2'  , text:'2'},
                    {value:'3'  , text:'3'},
                    {value:'3.5', text:'3,5'},
                    {value:'4'  , text:'4'  },
                    {value:'4.5', text:'4,5'},
                    {value:'5'  , text:'5'  }],
                comment:'',
            }
        },
        props:{
            child:{
                type:String,
                default(){
                    return ''
                }
            }
        },
        methods: {
            showResponse() {
                var params = new URLSearchParams;
                params.append('id', this.child)
                axios.get(`http://localhost:3309/showResponse`, {params})
                    .then(response => {
                        this.items = response.data.reverse()
                        this.$emit('responseid',this.items)
                    })
                    .catch(e => {
                        this.errors.push("cos nie pyklo")
                    })
            },
            fileConverts(file,type,name){
                var sampleArr =  base64ToArrayBuffer(file);
                saveByteArray(name, sampleArr,type);

            },
            addGrade(){
                var params = new URLSearchParams;
                params.append('comment', this.comment)
                params.append('grade', this.grade)
                params.append('taskid', this.child.taskId)
                params.append('email', localStorage.email)

                axios.post(`http://localhost:3309/addGrade`, params).then(response=>{
                    console.log("success")
                }).catch(e=>{
                    this.errors.push(e);
                })
            }
        },
        mounted() {
          this.showResponse()
        }



    }
</script>

<style scoped>

</style>