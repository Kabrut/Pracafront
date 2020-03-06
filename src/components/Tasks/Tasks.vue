<template>
    <div class="tasks">
        <b-card v-for="Task in Tasks"
              :key="Task.taskId"
    >
                {{Task.content}}
                <b-button v-if="Task.blob !== null"  v-on:click="fileConvert(Task.blob, Task.type, Task.filename)" variant="outline-dark">{{Task.filename}}<img src="@/assets/download.png"/></b-button>
            <p>{{error}}</p>
            <b-button variant="info" v-b-modal="modalId(Task.taskId)">Szczegóły</b-button>
            <ResponseList v-on:key="Task.taskId" :child='Task' v-on:event_child="eventChild" />
            <b-modal :id="modalId(Task.taskId)" title="Szczegóły zadania">
                {{Task.content}}
                <Response :key="Task.taskId" :child='Task.taskId'/>

            </b-modal>

        </b-card>
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
      errors: [],
      Tasks: "",
        i:0

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

</style>