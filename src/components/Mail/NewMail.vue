<template>
<div>
    <b-form>
      <b-form-group label="Odbiorca">
        <b-form-input type="email" placeholder="Odbiorca" v-model="Message.receiver"/>
      </b-form-group>
      <b-form-group label="Tytuł">
        <b-form-input v-model="Message.subject" placeholder="Tytuł"/>
      </b-form-group>
      <b-form-group label="Wiadomość">
        <b-form-textarea v-model="Message.content" placeholder="Treść"/>
        <b-button @click="message()">Wyślij</b-button>
      </b-form-group>
      </b-form>
</div>
   
</template> 
<script>
import axios from 'axios'
export default {
  data () {
    return {
      response: [],
      errors: [],
      author: this.$store.state.user.mail,
      Message: {
        subject: '',
        content: '',
        receiver: ''

      }
    }
  },
   methods: {
      message () {
        var params = new URLSearchParams();
      params.append('subject',this.Message.subject)
      params.append('content',this.Message.content)
      params.append('email',this.Message.receiver)
      params.append('email1',this.author)
      axios.post(`http://localhost:3309/newmail`, params)
        .then(response => {
          this.response = response.data
          console.log(response.data)
          this.showResponse = true
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
     getname(){
        this.Message.receiver = sessionStorage.getItem('msg')
     },

    },
    mounted(){
        setInterval(function (){
          this.getname()
     }.bind(this), 500)

    }
}
</script>