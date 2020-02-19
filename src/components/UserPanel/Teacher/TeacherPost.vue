<template>
  <div>
      <b-textarea placeholder="Treść wiadomości"></b-textarea>
      <b-button :pressed.sync="alert">Ustaw Alert</b-button>
      <p>Alert {{alert}}</p>
  </div>
</template>

<script>
export default {
    data() {
        return {
            alert: false,
        }
    }
}
</script>

<style scoped>

</style>