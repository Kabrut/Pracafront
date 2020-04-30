<template>
    <div class="tasks">
        <div v-for="Task in Tasks"
              :key="Task.taskId"
             class="tasklist"
    >
            <b-card class="cards" v-if="role=='teacher' || (year===Task.year && group === Task.groupz && field === Task.field.name)">
            <b-card-title>{{Task.subject.name}}: {{Task.title}} </b-card-title>
                {{Task.content}}
                <b-button v-if="Task.blob !== null"  v-on:click="fileConvert(Task.blob, Task.type, Task.filename)" variant="outline-dark">{{Task.filename}}<img src="@/assets/download.png"/></b-button>
            <p>{{error}}</p>

            <ResponseList v-if="role === 'teacher'" v-on:key="Task.taskId" :child='Task' v-on:event_child="eventChild" />
            <Response v-if="role ==='student' || role === 'leader'" :key="Task.taskId" :child='Task'/>


            </b-card>
        </div>
        {{errors}}
    </div>
</template>

<script>
import axios from "axios"
import {base64ToArrayBuffer,saveByteArray} from "./filedownload.js"
import Response from "./Response"
import ResponseList from "./ResponseList";
export default {
    components:{ResponseList, Response},
    data () {
    return {
      TaskContent: "",
      errors: " ",
      Tasks: "",
        i:0,
        role: this.$store.state.user.role.name,
        year: this.$store.state.user.year,
        group: this.$store.state.user.groups,
        field: this.$store.state.user.field.name,
    }
  },
    methods: {
        modalId(i) {
            return  'modali-' + i;
        },
    showMail () {
      axios.get(`http://localhost:3309/showTasks`)
        .then(response => {
            this.Tasks = response.data.reverse()
            var blob = new Blob([response.data[0].blob], {type: response.data[0].type});// change resultByte to byte
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = response.data[0].filename;
        })

        .catch(e => {
          this.errors.push("cos nie pyklo")
        })

    },
        fileConvert(file,type,name){
            var sampleArr =  base64ToArrayBuffer(file);
            saveByteArray(name, sampleArr,type);

        },
        eventChild(items){
            console.alert(items)
        },
        ShowList(){

        }

    },
  mounted () {
    this.showMail()

  }
}
</script>

<style scoped>
.tasklist{
    margin:5px;
    border-radius: 25px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
    .cards{
        border-radius:25px;
    }
</style>