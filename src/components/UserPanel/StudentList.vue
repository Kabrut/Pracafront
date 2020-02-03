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
        {key:'grupa', sortable: true}],
        items: [
          { imie: "Jan", nazwisko: 'Nowak', grupa: '1' },
          { imie: 'Katarzyna', nazwisko: 'Kowalska', grupa: '3' },
          { imie: 'Małgorzata', nazwisko: 'Robak', grupa: '2' },
          { imie: 'Michał', nazwisko: 'Bania', grupa: '4' },
          { imie: 'Danuta', nazwisko: 'Kciuk', grupa: '2' }
        ]
      }
    }
  }
</script>

<style scoped>

</style>

