<template>
<div>
    <vue-csv-import v-model="parseCsv" checkboxClass="Plik zawiera nagłówki" :map-fields="['Imie','Nazwisko','Kierunek','Grupa','email']">
      <template slot="hasHeaders" slot-scope="{headers, toggle}">
        <label>
            <input type="checkbox" id="hasHeaders" :value="headers" @change="toggle">
            Plik posiada nagłówki
        </label>
    </template>
    <template slot="error">
        Niewłaściwy typ pliku!
    </template>
    <template slot="thead">
        <tr>
            <th>Pola</th>
            <th>Kolumny</th>
        </tr>
    </template>
     <template slot="next" slot-scope="{load}">
        <button @click.prevent="load">Załaduj plik</button>
    </template>
    </vue-csv-import>
    <b-table :items="parseCsv"  />
    {{parseCsv.length}}
    <b-button label="Wyślij" @click="newList()"></b-button>
    
</div>
</template>

<script>
import { VueCsvImport } from 'vue-csv-import';
import axios from 'axios'
  export default {
        components: {VueCsvImport},
        data(){
          return {
            file: [],
            parseCsv:[]
          }
        },
        methods: {
      newList () {
        let i;
        for(i=0; i<11;i++){
        let params = new URLSearchParams();
      params.append('name',this.parseCsv[i].Imie);
      params.append('surname',this.parseCsv[i].Nazwisko);
      params.append('field',this.parseCsv[i].Kierunek);
      params.append('group',this.parseCsv[i].Grupa);
      params.append('email',this.parseCsv[i].email);
      axios.post(`http://localhost:3309/List`, params)
        .then(response => {
          this.response = response.data;
          //console.log(response.data)
          this.showResponse = true
         // location.reload(true)

        })
        .catch(e => {
          this.errors.push(e)
        })
      }}
    }

    }
</script>

<style scoped>
</style>