<template>
    <div class="received">
            <b-card 
            title="Nadawca">
            <b-card-title>{{ MailContent.title }}sdfsdfsdf</b-card-title>
        <b-card-text>{{ MailContent }} {{ errors }} </b-card-text>
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
    methods: {
    showMail () {
      axios.get(`http://localhost:3309/showMail`)
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