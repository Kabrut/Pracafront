<template>
<div>
  <b-button v-b-modal.modal-1>Dodaj zadanie</b-button>
      <b-modal id="modal-1"
      title="Nowe Zadanie"
      @ok="both"
      >
          <p>Temat zadania:</p>
          <b-form-input label="Temat" v-model="title" />
          <p>Kierunek:</p>
          <b-form-select v-model="field" :options="items" text-field="name"></b-form-select>
          <p>Rok</p>
          <b-form-select v-model="year" :options="options1"></b-form-select>
          <p>Przedmiot</p>
          <b-form-select v-model="subject" :options="subjects" text-field="name" ></b-form-select>
          <p>Grupa</p>
          <b-form-select v-model="group" :options="options1"></b-form-select>
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
    data () {
    return {
        options:[
            { value:  '1', text:'1'},
            { value:  '2', text:'2'},
            { value:  '3', text:'3'},
            { value:  '4', text:'4'},
            { value:  '5', text:'5'},
            { value:  '6', text:'6'},
            { value:  '7', text:'7'},
            { value:  '8', text:'8'},
            { value:  '9', text:'9'},
            { value:  '10',text: '10'}],
        options1:[
            { text: '1', value: '1'},
            { text: '2', value: '2'},
            { text: '3', value: '3'},
            { text: '4', value: '4'}],
        field: null,
        year:null,
        group:null,
        title:'',
        response: [],

        items:[],

      file: '',
        subjects:[],
      content: '',
        fileava: false

    }
  },
    methods:{
    wyslij(){
       let formData = new FormData();
       formData.append('file', this.file)
         formData.append('content', this.content),
         formData.append('subject', this.subject),
         formData.append('field', this.field),
         formData.append('year', this.year),
         formData.append('title', this.title),
         formData.append('group', this.group),

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
              params.append('content', this.content),
              params.append('subject', this.subject),
              params.append('field', this.field),
              params.append('year', this.year),
              params.append('title', this.title),
              params.append('group', this.group),
          axios.post(`http://localhost:3309/newTask1`,
              params).then(function(){
              console.log('success')
          }).catch(function(){
              console.log('Failure')
          })
      },
      getsubjects(){
          var params = new URLSearchParams;
          params.append('email', localStorage.email)
          axios.get(`http://localhost:3309/getSubject`, {params})
              .then(response =>{
                  this.subjects=response.data.reverse();
          }).catch(function(){
              console.log('Failure')
          })
      },
      getField() {
          axios.get(`http://localhost:3309/showFields`).then(response =>{
              this.items = response.data.reverse()

          }).catch(e =>{this.errors.push("cos nie pyklo")})
      },
      },
    mounted() {
      this.getField()
      this.getsubjects()
    }


}
</script>