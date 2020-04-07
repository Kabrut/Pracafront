<template>
    <div>
        <b-button variant="outline-info" v-b-modal="modalId(child.taskId)">Szczegóły</b-button>

        <b-modal @ok="both()" :id="modalId(child.taskId)" title="Szczegóły zadania">
            <h4>Odpowiedź</h4>
            <b-textarea v-model="content"/>
            <input  type="file" id="file" ref="file" v-on:change="upload()"/>
            <b-card v-if="response !== ''"> {{response.content}}<pre/>
                <b-button  @click="fileConverts(response.file, response.filetype, response.filename)" variant="outline-info">
                    {{response.filename}}<img src="@/assets/download.png"/>
                </b-button>
            </b-card>
        </b-modal>
    </div>
</template>

<script>
    import axios from 'axios'
    import {base64ToArrayBuffer,saveByteArray} from "./filedownload.js"
    export default {
        data(){
          return{
              file: '',
              content:'',
              role:this.$store.state.user.role.name,
              i:0,
              response:''
          }
        },
        props:{
            child:{
                default(){
                    return ''
                }
            }
        },
        name: "Response",
        methods:{
            modalId(i) {
                return  'modali-' + i;
            },
            wyslij(){
                let formData = new FormData();
                formData.append('file', this.file)
                formData.append('content', this.content)
                formData.append('email',this.$store.state.user.mail)
                formData.append('taskid', this.child.taskId)
                axios.post(`http://localhost:3309/newTaskResponse`,
                    formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(function(){
                    console.log('success')
                    this.show();
                }).catch(function(){
                    console.log('Failure')
                })
            },
            show(){
                var params = new URLSearchParams;
                params.append("mail",this.$store.state.user.mail);
                params.append("taskid", this.child.taskId)
                axios.get(`http://localhost:3309/userResponse`,{params})
            .then(resp=>{
                this.response = resp.data
                }).catch(function(){
                    console.log('failure');
                })
            },
            upload() {
                this.file = this.$refs.file.files[0]
                this.errors = this.$refs.file.name
            },
            both(){
                this.upload();
                this.wyslij();
            },
            fileConverts(file,type,name){
                var sampleArr =  base64ToArrayBuffer(file);
                saveByteArray(name, sampleArr,type);

            },
        },
        mounted() {
            this.show();
        }
    }
</script>

<style scoped>

</style>