<template>
  <div class="commentbox">
    <b-button
      v-b-toggle.collapse-3
      variant="none"
      > <img src="@/assets/comment.png"/></b-button>
        <div class="loop" v-for="Comment in child.commentList" v-bind:key="Comment.postid">
      <b-collapse
      id="collapse-3"
      class="mt-2"
    >
      <b-card bg-variant="light" border-variant="info" >
    <div class="image">
     <img
        src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
        style="width:50px"
      >
      </div>
        <div class="delete">
          <b-button @click="deleteComment(Comments)" >delete</b-button>
        </div>
    <div class="name">
      <p></p>
    </div>
    <div class="content">{{ Comment.content }}</div>
        </b-card>
      </b-collapse></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Comment',
  props: ['post_id'],
  data () {
    return {
      Comments: [],
      response: []
    }
  },
  props:{
    child:{
      default(){
        return ''
      }
    }
  },
  methods: {
    deleteComment: async function (comment_id) {
      axios.delete(`http://localhost:8000/comments/${comment_id}`)
        .then(response => {
          console.log(response)
        })
      this.$emit('deleted')
      await this.$nextTick()
      this.showComment()
    },
    showComment () {
      axios.get(`http://localhost:3309/showComment/${this.props.child.postid}`)
        .then(response => {
          this.Comments = response.data.reverse()
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  mounted () {
    this.showComment()
  }
}
</script>

<style scoped>
  .commentbox{
    padding:0px;
  }
.name{
  float:left;
}
  .content{
    width:100%;
    padding:0px;
  }
  .image{
    float:left;
  }
.delete{
  float:right;
  display:block;
}
</style>