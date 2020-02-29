<template>
<div>
    <input type="file"/>
  <b-button v-b-modal.modal-1>Dodaj zadanie</b-button>
      <b-modal id="modal-1"
      title="Nowe Zadanie"
      @ok="both"
      >

  <p> Treść zadania:</p>
          <b-form-textarea v-model="content"/>

<!--    <b-form-file-->
<!--            id="file"-->
<!--      ref="file"-->
<!--      v-on:change="upload()"-->
<!--    ></b-form-file>-->
          <input type="file" id="file" ref="file" v-on:change="upload()" placeholder="Wybierz">
{{formData.Content-Type}}
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
        var params
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
      },
      both(){
        this.upload();
        this.wyslij();
      }
  }
}
</script>