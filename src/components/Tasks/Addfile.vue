<template>
<div>
  <b-button v-b-modal.modal-1>Dodaj zadanie</b-button>
      <b-modal id="modal-1" 
      title="Nowe Zadanie"
      @ok="wyslij()"
      >
  <p> Treść zadania:</p>
          <b-textarea/>
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
export default {
  methods:{
    wyslij (){
      
    }
  }
}
</script>