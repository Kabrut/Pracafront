<template>
    <div>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="'Chat ' + i">
          Tab contents {{ i }}
          <b-button size="sm" variant="danger" class="float-right" @click="closeTab(i)">
            Close tab
          </b-button>
        </b-tab>

        <!-- New Tab Button (Using tabs-end slot) -->
        <template v-slot:tabs-end>
          <b-nav-item @click.prevent="newTab" href="#"><b>+</b></b-nav-item>
        </template>

        <!-- Render this if no tabs -->
        <template v-slot:empty>
          <div class="text-center text-muted">
            Brak otwartych czatów<br>
            otwórz nowy za pomocą przycisku <b>+</b>.
          </div>
        </template>
      </b-tabs>
        <b-table-simple striped hover responsive>
        <b-thead head-variant="dark">
           <b-tr>
               <b-th colspan="4">Użytkownik</b-th>
               <b-th colspan="2">Ostatnio aktywny</b-th>
           </b-tr>
        </b-thead>
         <b-tbody>
      <b-tr>
     
        <b-th class="text-right">Jan Kowalski</b-th>
        <b-td/>
        <b-td/>
        <b-td/>
        <b-td>22 min</b-td>
      
      </b-tr>
      <b-tr>
        
        <b-th class="text-right">Kamil</b-th>
        <b-td/>
        <b-td/>
        <b-td/>

        <b-td>56 min</b-td>
      </b-tr>
      </b-tbody>
   </b-table-simple>

    </b-card>
  </div>
  
</template>

<script>
export default {
    data() {
      return {
        tabs: [],
        tabCounter: 0
      }
    },
    methods: {
      closeTab(x) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i] === x) {
            this.tabs.splice(i, 1)
          }
        }
      },
      newTab() {
        this.tabs.push(this.tabCounter++)
      }
    }
  }
</script>
<style scoped>

</style>