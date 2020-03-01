<template>
    <div class="received">
            <b-card 
            title="Temat:">
            <b-card-title>{{ child[0].subject}}</b-card-title>
        <b-card-text>{{child[0].content}}</b-card-text>
        </b-card>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data () {
    return {
      MailContent: "",
      errors: []
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
    methods: {
    showMail () {
      axios.get(`http://localhost:3309/showMsg`)
        .then(response => {
          this.MailContent = response.data.reverse()
        })
        .catch(e => {
          this.errors.push("cos nie pyklo")
        })
    }
  },
  mounted () {
    this.showMail()
  }
}
</script>
<style scoped>

</style>