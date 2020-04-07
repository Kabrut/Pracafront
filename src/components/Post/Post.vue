<template>
  <div id="app">
    <NewPost @done = "done()"/>
    <div class="content" >
      <b-card v-for="Post in Posts"
              :key="Post.postid"
              class="posts"
      >
        <p><strong>
        <p>{{ Post.user.name }} {{Post.user.surname}} <b-button variant="outline" class="delete" @click="deletePost(Post.postid)"><img src="@/assets/trash.png"/></b-button></p>
        </strong>

        </p>

      <b-card>

        <div class="contentbox">
          <p>{{ Post.post_content }}</p>
          <p><b-button v-if="Post.blob !== null"  v-on:click="fileConverts(Post.blob, Post.filetype,Post.filename)" variant="outline-info"> <img src="@/assets/download.png"/>{{Post.filename}}</b-button></p>
        </div>
      </b-card>
      <div class="comment">
      <Comment :key='Post.postid' :child='Post' class="comment"/>
          <new-comment :child = 'Post' :key='Post.postid' class="comment"/>
      </div>
      </b-card>
    </div>

    {{ errors }}
  </div>

</template>

<script>
import Comment from './Comment'
import NewPost from './NewPost'
import axios from 'axios'
import NewComment from "./NewComment";
import {base64ToArrayBuffer,saveByteArray} from "../Tasks/filedownload.js"
export default {
  name: 'Posts',
  components: {NewComment, NewPost, Comment},
  data () {
    return {
      commentkey: 0,
      post_id: 0,
      Posts: "",
      errors: []
    }
  },
  methods: {
    showPost () {
      var params = new URLSearchParams;
      params.append('field',this.$store.state.user.field.name)
      params.append('group',this.$store.state.user.groups)
      params.append('year',this.$store.state.user.year)
      axios.get(`http://localhost:3309/showGroupPost`,{params})
        .then(response => {
          this.Posts = response.data.reverse()
          console.log(response.Post)
        })
        .catch(e => {
          this.errors.push("cos nie pyklo")
        })
    },

  updateComponent: function () {
    this.post_id += 1
    this.commentkey += 1
  },
  deletePost (id) {
    axios.delete(`http://localhost:3309/deletePost${id}`)
            .then(response => {
              console.log(response)
              this.showPost()
            })

    this.$emit('delpost')
  },
    done() {
      this.showPost()
    },
    fileConverts(file,type,name){
      var sampleArr =  base64ToArrayBuffer(file);
      saveByteArray(name, sampleArr,type);

    },
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
  .posts{
    margin:15px;
    border-radius: 25px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>