<template>
    <div>
        <b-button v-b-toggle.collapse-1 variant="primary">Przedmiot</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card>
      <GradeList/>
    </b-card>
  </b-collapse>
    </div>
</template>

<script>
    import GradeList from "../components/GradeList";
    export default {
        name: "Grades",
        components: { GradeList}
    }

</script>

<style scoped>

</style>