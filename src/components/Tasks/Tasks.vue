<template>
    <div class="tasks">
        <b-card>
            <p>
                {{content}}{{errors}}
            </p>
        </b-card>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data () {
    return {
      TaskContent: "",
      errors: []
    }
  },
    methods: {
    showMail () {
      axios.get(`http://localhost:3309/showTasks`)
        .then(response => {
          this.TaskContent = response.data.reverse()
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