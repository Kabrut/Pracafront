<template>
  <div>
    <b-card>
    <b-table striped hover :items="items" :fields="fields"></b-table> 
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields:[{key: 'imie', sortable: true},
        {key: 'nazwisko', sortable:true},
        {key:'grupa', sortable: true},
        {key:'kierunek', sortable: true }],
        items: [
          { imie: "Jan", nazwisko: 'Nowak', grupa: '1', kierunek: 'Informatyka' },
          { imie: 'Katarzyna', nazwisko: 'Kowalska', grupa: '3', kierunek: 'Ekonomia' },
          { imie: 'Małgorzata', nazwisko: 'Robak', grupa: '2', kierunek: 'Informatyka' },
          { imie: 'Michał', nazwisko: 'Bania', grupa: '4', kierunek: 'Mechatronika' },
          { imie: 'Danuta', nazwisko: 'Kciuk', grupa: '2', kierunek:'Psychologia' }
        ]
      }
    }
  }
</script>

<style scoped>

</style>

