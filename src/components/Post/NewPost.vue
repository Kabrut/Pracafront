<template>
    <div class='new'>
        <b-card>
            <b-card-header>
                Nowy post 
            </b-card-header>
            <b-card-content>
                <b-form-textarea v-model="Post.content"/>
            </b-card-content>
            <b-card-footer><b-button @click="newPost()"> Wyślij </b-button>  <b-button> Dodaj plik </b-button></b-card-footer>
        </b-card>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data () {
    return {
      response: [],
      errors: [],
      Post: {
        content: ''
      }
    }
  },
   methods: {
      newPost () {
        var params = new URLSearchParams();
        params.append('content',this.Post.content);
        params.append('email', localStorage.email);


      axios.post(`http://localhost:3309/newPost`, params)
        .then(response => {
          this.response = response.data
          //console.log(response.data)
          this.showResponse = true
         // location.reload(true)
            this.$emit("done")
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    }
}
</script>
<style scoped>

.new b-card{
    background:cadetblue;
}

</style>