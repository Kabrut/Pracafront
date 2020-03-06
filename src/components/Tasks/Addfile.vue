<template>
<div>
  <b-button v-b-modal.modal-1>Dodaj zadanie</b-button>
      <b-modal id="modal-1"
      title="Nowe Zadanie"
      @ok="both"
      >
  <p> Treść zadania:</p>
          <b-form-textarea v-model="content"/>
          {{errors}}
          <input type="file" id="file" ref="file" v-on:change="upload()" placeholder="Wybierz">

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
      errors: $refs.file.name,
      file: '',
      content: '',
        fileava: false

    }
  },
    wyslij(){
       let formData = new FormData();
       formData.append('file', this.file)
         formData.append('content', this.content)
        axios.post(`http://localhost:3309/newTask`,
        formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(function(){
            console.log('success')
        }).catch(function(){
            console.log('Failure')
        })
    },
      upload() {
        this.file = this.$refs.file.files[0]
          this.errors = this.$refs.file.name

      },
      both(){
        if (this.file){
            this.wyslij();
        }else{
            this.wyslij1();
        }

      },
      wyslij1(){
        var params = new URLSearchParams;
        params.append('content', this.content)
          axios.post(`http://localhost:3309/newTask1`,
              params).then(function(){
              console.log('success')
          }).catch(function(){
              console.log('Failure')
          })
      }

  }
}
</script>