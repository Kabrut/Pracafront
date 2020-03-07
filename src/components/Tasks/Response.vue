<template>
    <div>
        <h4>Odpowiedź</h4>
        <b-textarea v-model="content"/>
        <input  type="file" id="file" ref="file" v-on:change="upload()"/>
        <b-button @click="both">Wyslij</b-button>


    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
          return{
              file: '',
              content:'',

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
        name: "Response",
        methods:{
            wyslij(){
                let formData = new FormData();
                formData.append('file', this.file)
                formData.append('content', this.content)
                formData.append('email',localStorage.email)
                formData.append('taskid', this.child)
                axios.post(`http://localhost:3309/newTaskResponse`,
                    formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(function(){
                    console.log('success')
                }).catch(function(){
                    console.log('Failure')
                })
            },
            show(){

            },
            upload() {
                this.file = this.$refs.file.files[0]
                this.errors = this.$refs.file.name
            },
            both(){
                this.upload();
                this.wyslij();
            }
        }
    }
</script>

<style scoped>

</style>