<template>
  <div id="app">
    <div class="content" >
      <b-card v-for="Post in Posts"
              :key="Post.post_id"
      >

        <div class="delete_post">
          <b-button
          @click="deletePost(Post.post_id)">Usuń
          </b-button>
        </div>
        <p><strong>
        <h3>{{ Post.post_title }}</h3>
        </strong>
        </p>
      <b-card>
        <div class="contentbox">
          <p>{{ Post.post_content }}</p>

        </div>
      </b-card> 

      </b-card>
    </div>

    {{ errors }}
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'Posts',

  data () {
    return {
      commentkey: 0,
      post_id: 0,
      Posts: [],
      errors: []
    }
  },
  methods: {
    showPost () {
      axios.get(`http://localhost:3038/show`)
        .then(response => {
          this.Posts = response.data.reverse()
          console.log(response.Post)
        })
        .catch(e => {
          this.errors.push(e)
        })
    },/*
    deletePost (post_id) {
      axios.delete(`http://localhost:3038/posts/${post_id}`)
        .then(response => {
          console.log(response)
        })
      this.$emit('delpost')
    }
  },*/
  updateComponent: function () {
    this.post_id += 1
    this.commentkey += 1
  },
  mounted () {
    this.showPost()
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