<template>
    <div class="tasks">
        <b-card v-for="Task in Tasks"
              :key="Task.taskId">
            <p>
                {{Task.content}}
                <button v-on:click="fileConvert(Task.blob, Task.type, Task.filename)">pobierz</button>
            <p >{{Task.filename}}</p>
            <p>{{error}}</p>
            <b-button variant="info" v-b-modal="modalId(Task.taskId)">Szczegóły</b-button>
            <b-modal :id="modalId(Task.taskId)" title="Szczegóły zadania">
                {{Task.content}}

                <Response/>
            </b-modal>
            </p>

        </b-card>
        {{errors}}
    </div>
</template>

<script>
import axios from "axios"
import {base64ToArrayBuffer,saveByteArray} from "./filedownload.js"
import Response from "./Response"
export default {
    components:{Response},
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

        // axios({
        //     url: 'http://localhost:3309/showTasks',
        //     method: 'GET',
        //     responseType: 'blob',
        // }).then((response) => {
        //
        //     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        //     var fileLink = document.createElement('a');
        //     this.Tasks = response.data.reverse()
        //     fileLink.href = fileURL;
        //     fileLink.setAttribute('download', response.data[0].filename);
        //     document.body.appendChild(fileLink);
        //
        //     fileLink.click();
        // });
    },
        fileConvert(file,type,name){
            var sampleArr =  base64ToArrayBuffer(file);
            saveByteArray(name, sampleArr,type);

        }

    },
  mounted () {
    this.showMail()
  }
}
</script>

<style scoped>

</style>