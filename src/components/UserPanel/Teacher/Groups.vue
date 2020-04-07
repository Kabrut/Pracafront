<template>
  <div class="page">
      <b-card title="Dodaj post dla kierunku" class="cardd">
          <pre/>

          <div>
          <p>Wybierz Kierunek</p>
          <v-select  v-model="field" label="name" :options="items"></v-select>

          <p>Wybierz Rocznik</p>
          <v-select  v-model="year" label="year" :options="response"></v-select>
              <pre/></div>
          <b-textarea v-model="content" placeholder="Treść wiadomości"></b-textarea>

          <div class="btns">
            <label class="label" for="file"><img src="@/assets/add.png"/> {{file.name}} </label>
          <b-form-checkbox class="check" v-model="alert" @change="toggle" switch>Ustaw Alert</b-form-checkbox></div>
          <input class="file" type="file" id="file" ref="file" v-on:change="upload()" placeholder="Wybierz">
          <pre/>
          <b-button @click="both()" variant="outline-danger">Dodaj Post</b-button>

            <b-card title="wyslane posty">
                <b-card v-for="post in Posts"
                :key="post.postid">
                    {{post.post_content}}  <b-button  v-on:click="fileConverts(post.blob, post.filetype,post.filename)" variant="outline-info"> <img src="@/assets/download.png"/></b-button>
                </b-card>

            </b-card>
          {{file}}
      </b-card>
  </div>
</template>

<script>
    import axios from 'axios'
    import vSelect from "vue-select"
    import 'vue-select/dist/vue-select.css';
    import {base64ToArrayBuffer,saveByteArray} from "./filedownload.js"
export default {
    components: {vSelect},
     data() {
      return {
          file:'',
          items:[],
          alert: false,
          response: '',
          field:'',
          year:'',
          content:'',
          Posts: [],
          forall:true,
      }
      },
    methods:{
        both(){
            if (this.file){
                this.wyslij();
            }else{
                this.newPosts();
            }

        },
        getyears() {
            axios.get(`http://localhost:3309/getyear`).then(response =>{
                this.response = response.data

            }).catch(e=>{
                this.errors.push(e)
            })
        },
        getFields() {
            axios.get(`http://localhost:3309/showFields`).then(response =>{
                this.items = response.data
            }).catch(e=>{
                this.errors.push(e)
            })
        },
        getPosts(){
          var params = new URLSearchParams;
          params.append("mail", this.$store.state.user.mail)
            axios.get(`http://localhost:3309/allforall`,{params}).then(response=>{
                this.Posts = response.data;
            }).catch(e=>{
                this.errors.push(e)
            })
        },
        fileConverts(file,type,name){
            var sampleArr =  base64ToArrayBuffer(file);
            saveByteArray(name, sampleArr,type);

        },

    wyslij(){
        let formData = new FormData();
        formData.append('file', this.file)
        formData.append('content', this.content)
        formData.append('alert', JSON.stringify(this.alert))
        formData.append('field', this.field.name)
        formData.append('year', this.year)
        formData.append('mail', this.$store.state.user.mail)
        axios.post(`http://localhost:3309/newPostforall`,
            formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(function(){
            console.log('success')
        }).catch(function(){
            console.log('Failure')
        })
    },
        newPosts () {
            var params = new URLSearchParams();
            params.append('content',this.content);
            params.append('email', this.$store.state.user.mail);
            params.append('alert', this.alert);
            params.append('forall', this.forall);
            params.append('fieldname', this.field.name)
            params.append('year', this.year)
            axios.post(`http://localhost:3309/newPost1`, params)
                .then(response => {
                    this.response = response.data
                    this.showResponse = true

                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
    upload() {
        this.file = this.$refs.file.files[0]
        this.errors = this.$refs.file.name
    },

    },
    mounted() {
        this.getFields();
        this.getyears();
        this.getPosts();
    }
}
</script>

<style scoped>
    .btns{
        display:block;
    }
    .btn1{
        background: none;
        border:none;
        float:left;

    }
    .check{
        float:right;
        padding:10px;
    }

    .file{
        background:none;
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
     .label{
        cursor: pointer;
    }
    .page{
        width:70%;
        margin-left: 20%;
        margin-top: 10px;
    }
    .cardd{
        border-radius:25px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>