<template>
  <div>
      <b-card title="Dodaj post dla wybranej grupy">
        <br>
          <v-select :options="options"></v-select>
          <b-button>Wybierz</b-button>
          <TeacherPost/>
      </b-card>

  </div>
</template>

<script>
import TeacherPost from './TeacherPost'
import vSelect from "vue-select"
import 'vue-select/dist/vue-select.css';
export default {
    components: {vSelect, TeacherPost},
     data() {
      return {
    options:['Informatyka', 'Ekonomia']
      }
      }
}
</script>

<style scoped>

</style>