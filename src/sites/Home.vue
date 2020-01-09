<template>
  <div class="home">
    <MenuTiles/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import MenuTiles from '@/components/MenuTiles.vue'
export default {
  computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
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
