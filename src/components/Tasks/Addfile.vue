<template>
<div>
  <b-button v-b-modal.modal-1>Dodaj zadanie</b-button>
      <b-modal id="modal-1" 
      title="Nowe Zadanie"
      @ok="wyslij()"
      >
  <p> Treść zadania:</p>
          <b-form-textarea v-model="content"/>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      </b-modal>
</div>
</template>
<script>
import axios from 'axios';

export default {
  methods:{
    data () {
    return {
      response: [],
      errors: [],
      file: '',
      content: ''
      
    }
  },
    wyslij(){
       var params = new URLSearchParams();
       let formData = new FormData();
       formData.append('file', this.file[0]);
       params.append('content',this.content)

       let config={header:{'Content-Type' : 'multipart/form-data'}}


      axios.post(`http://localhost:3309/newTask`, params,formData,config)
        .then(response => {
          this.response = response.data
          //console.log(response.data)
          this.showResponse = true
          location.reload(true)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>