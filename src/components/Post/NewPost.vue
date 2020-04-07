<template>
    <div class='new'>
        <b-card class="newpost">
            <b-card-header class="white">
                Nowy post 
            </b-card-header>
            <b-card-content>
                <b-form-textarea v-model="Post.content"/>
            </b-card-content>
            <b-card-footer class="white">
                <label class="label" for="file"><img src="@/assets/add.png"/>
                <b-button variant="outline-dark" class="btn" @click="both()"> Wyślij </b-button> <input class="file" type="file" id="file" ref="file" v-on:change="upload()" placeholder="Wybierz">
                </label></b-card-footer>
        </b-card>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data () {
    return {
      response: [],
        alert:false,
        forall:false,
      errors: [],
      Post: {
        content: ''
      }
    }
  },
   methods: {
      newPost () {
        var params = new URLSearchParams();
        params.append('content',this.Post.content);
        params.append('email', this.$store.state.user.mail);
        params.append('alert', this.alert);
        params.append('forall', this.forall);
        params.append('fieldname', this.$store.state.user.field.name)
        params.append('group', this.$store.state.user.groups)
      axios.post(`http://localhost:3309/newPost`, params)
        .then(response => {
          this.response = response.data
          //console.log(response.data)
          this.showResponse = true
         // location.reload(true)
            this.$emit("done")
        })
        .catch(e => {
          this.errors.push(e)
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
               this.newPost();
           }

       },
       wyslij(){
           let formData = new FormData();
           formData.append('file', this.file)
           formData.append('content', this.Post.content)
           formData.append('field', this.$store.state.user.field.name)
           formData.append('mail', this.$store.state.user.mail)
           formData.append('group', this.$store.state.user.groups)
           axios.post(`http://localhost:3309/newFileGrp`,
               formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(function(){
               console.log('success')
               this.$emit("done")
           }).catch(function(){
               console.log('Failure')
           })
       },
    }

}
</script>
<style scoped>

.new b-card{
    background:white;
}
    .btn{
        margin: 10px;
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
.newpost{
    margin:15px;
    border-radius: 25px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
    .white{
        background:white;
    }
</style>