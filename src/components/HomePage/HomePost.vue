<template>
    <div id="app">

        <div class="content" >
            <center><h2 class="text" v-if="localfield !== 'pracownik'">Posty grupy {{localfield}} {{localyear}}</h2></center>
            <center><h2 class="text" v-if="localfield === 'pracownik'">Posty pracowników</h2></center>
            <div v-for="Post in Posts"
                    :key="Post.postid"
            >
                <b-card :variant="ifalert(Post.alert)" class="cardd">
                <p><strong>
                <p>{{ Post.user.name }} {{Post.user.surname}} <b-button v-if="user === Post.user.mail" variant="outline" class="delete" @click="deletePost(Post.postid)"><img src="@/assets/trash.png"/></b-button></p>
                </strong>

                </p>

                <b-card>

                    <div class="contentbox">
                        <p>{{ Post.post_content }}</p>
                        <p><b-button v-if="Post.blob !== null"  v-on:click="fileConverts(Post.blob, Post.filetype,Post.filename)" variant="outline-info"> <img src="@/assets/download.png"/>{{Post.filename}}</b-button></p>

                    </div>
                </b-card>
                <div class="comment">
                </div>
                </b-card>
            </div>

        </div>

        {{ errors }}
    </div>

</template>

<script>
 //   import Comment from './Comment'
  //  import NewPost from './NewPost'
 import {base64ToArrayBuffer,saveByteArray} from "../Tasks/filedownload.js"
    import axios from 'axios'
  //  import NewComment from "./NewComment";
    export default {
        name: 'HomePost',
       // components: {NewComment, NewPost, Comment},
        data () {
            return {
                localfield: this.$store.state.user.field.name,
                localyear: this.$store.state.user.year,
                Posts: '',
                errors: '',
                user: this.$store.state.user.mail,
            }
        },
        methods: {
            ifalert(alert){
                if(alert){
                    return 'info'
                }

            },
            showPost () {
                var params = new URLSearchParams
                params.append('mail', this.$store.state.user.mail)
                axios.get(`http://localhost:3309/show`, {params})
                    .then(response => {
                        this.Posts = response.data.reverse()
                        console.log(response.data)
                    })
                    .catch(e => {
                        this.errors.push("cos nie pyklo")
                    })
            },
            fileConverts(file,type,name){
                var sampleArr =  base64ToArrayBuffer(file);
                saveByteArray(name, sampleArr,type);

            },
            updateComponent: function () {
                this.post_id += 1

            },
            deletePost (id) {
                axios.delete(`http://localhost:3309/deletePost${id}`)
                    .then(response => {
                        console.log(response)
                        this.showPost()
                    })

                this.$emit('delpost')
            }
        },
        mounted () {
            this.showPost()
            /*  setInterval(function (){
                this.showPost();
              }.bind(this), 500)*/
        }
    }
</script>

<style scoped>
    #app{
        position:center;
        width: 60%;
        margin-left:10%;
        margin-top: 10px;
    }
    .contentbox{
        height: 100px;
    }
    .content{
        width:100%;
    }
    .delete{
        float:right;
        display: block;
    }
    .comment{
        display:inline-block;
        float:left;
    }
    .cardd{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .card{
        margin-top:10px;
        border-radius: 25px;
    }
    .text{
        color:white;
    }
</style>