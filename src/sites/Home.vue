<template>
  <div class="home">
    <MenuTiles/>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuTiles from '@/components/MenuTiles.vue'
export default {
  name: 'home',
  components: {
    MenuTiles
  }
}
</script>
<style scoped>
.home{
  display: flex;
}
</style>
