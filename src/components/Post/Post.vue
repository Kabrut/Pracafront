<template>
  <div id="app">
    <NewPost/>
    <div class="content" >
      <b-card v-for="Post in Posts"
              :key="Post.post_id"
      >
        <p><strong>
        <h3>{{ Post.post_title }}</h3>
        </strong>
        </p>
      <b-card>
        <div class="contentbox">
          <p>{{ Post.post_content }}</p>

        </div>
      </b-card> 
      <Comment/>
      </b-card>
    </div>

    {{ errors }}
  </div>

</template>

<script>
import Comment from './Comment'
import NewPost from './NewPost'
import axios from 'axios'
export default {
  name: 'Posts',
  components: { NewPost, Comment},
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
      axios.get(`http://localhost:3309/show`)
        .then(response => {
          this.Posts = response.data.reverse()
          console.log(response.Post)
        })
        .catch(e => {
          this.errors.push("cos nie pyklo")
        })
    }
  },
  updateComponent: function () {
    this.post_id += 1
    this.commentkey += 1
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
  .delete_post{
    float:right;
    display: block;
  }
</style>