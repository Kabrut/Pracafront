<template>
<div>
   <!-- <b-button v-b-modal.modal-2>Dodaj liste</b-button>
      <b-modal id="modal-2" 
      title="Nowa Lista">
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      </b-modal> -->
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
    {{parseCsv.Imie}}
    {{file}}
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
        var i
        for(i=0; i<this.parseCsv.length;i++){
        var params = new URLSearchParams();
      params.append('content',JSON.stringify(this.parseCsv[i]))
        this.file=params[1]

      axios.post(`http://localhost:3309/List`, params)
        .then(response => {
          this.response = response.data
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