<template>
  <div>
    <b-card>
    <b-table striped hover :items="items" :fields="fields"></b-table>
    </b-card>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        fields:[{key: 'name',label:'Imie', sortable: true},
        {key:'surname',label: 'nazwisko', sortable:true},
        {key: 'groups',label:'grupa', sortable: true},
        {key: 'field.name',label:'kierunek', sortable: true },
          {key: 'year',label:'rok', sortable: true }],
        items: [],
      }
    },
    methods: {
      getList(){
        axios.get(`http://localhost:3309/getList`)
                .then(response => {
                  this.items = response.data.reverse()
                })
                .catch(e => {
                  this.errors.push("cos nie pyklo")
                })
      }
    },
    mounted(){
      this.getList();
    }
  }
</script>

<style scoped>

</style>

