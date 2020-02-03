<template>
    <div class="tasks">
        <b-card v-for="Task in Tasks"
              :key="Task.id">
            <p>
                {{Task.content}}
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
      errors: [],
      Tasks: ""
    }
  },
    methods: {
    showMail () {
      axios.get(`http://localhost:3309/showTasks`)
        .then(response => {
          this.Tasks = response.data.reverse()
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