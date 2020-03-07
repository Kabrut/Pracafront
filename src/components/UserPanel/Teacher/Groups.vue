<template>
  <div>
      <b-card title="Dodaj post dla kierunku">
          <pre/>
          <p>Wybierz Kierunek</p>
          <v-select  v-model="selected" label="name" :options="items"></v-select>
          <pre/>
          <b-textarea placeholder="Treść wiadomości"></b-textarea>

          <div class="btns">
            <label class="label" for="file"><img src="@/assets/add.png"/> {{file.name}} </label>
          <b-form-checkbox class="check" v-model="alert" @change="toggle" switch>Ustaw Alert</b-form-checkbox></div>
          <input class="file" type="file" id="file" ref="file" v-on:change="upload()" placeholder="Wybierz">
          <pre/> <pre/>
          <b-button variant="outline-danger">Dodaj Post</b-button>
      </b-card>
  </div>
</template>

<script>
    import axios from 'axios'
    import TeacherPost from './TeacherPost'
    import vSelect from "vue-select"
    import 'vue-select/dist/vue-select.css';
export default {
    components: {vSelect, TeacherPost},
     data() {
      return {
          file:[],
          items:[],
          alert: false,
    options:['Informatyka', 'Ekonomia']
      }
      },
    methods:{

        getFields() {
            axios.get(`http://localhost:3309/showFields`).then(response =>{
                this.items = response.data
            }).catch(e=>{
                this.errors.push(e)
            })
        },

    wyslij(){
        let formData = new FormData();
        formData.append('file', this.file)
        formData.append('content', this.content)
        axios.post(`http://localhost:3309/newPost`,
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
    },
    mounted() {
        this.getFields();
    }
}
</script>

<style scoped>
    .btns{
        display:block;
    }
    .btn1{
        background: none;
        border:none;
        float:left;

    }
    .check{
        float:right;
        padding:10px;
    }

    .file{
        background:none;
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
     .label{
        cursor: pointer;
    }
</style>