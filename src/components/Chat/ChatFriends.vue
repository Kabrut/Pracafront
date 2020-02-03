<template>
    <div class="chat">
    <b-card no-body>
       <b-tabs card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="'Chat ' + i">
         <div class="messages" v-for="j in Chat" :key="'dyn-msg'+j">
           <div class="send"><b-badge variant="secondary" ><div class="wrap">{{Chat.message}}</div></b-badge></div>
          <div class="received"><b-badge variant="primary">Tak będzie wyglądała wiadomość otrzymana</b-badge></div>
          
          
          </div>
          <b-input v-model="Chat.messagewrited" @keyup.enter="send()"/>
          <b-button size="sm" variant="danger" class="float-right" @click="closeTab(i)">
            X
          </b-button>
        </b-tab>

        <!-- New Tab Button (Using tabs-end slot) -->
      

        <!-- Render this if no tabs -->
        <template v-slot:empty>
          <div class="text-center text-muted">
            Brak otwartych czatów<br>
          
          </div>
        </template>

      </b-tabs>
        <b-table-simple striped hover responsive>
        <b-thead head-variant="dark">
           <b-tr>
               <b-th colspan="4">Użytkownik</b-th>
               <b-th colspan="2">Ostatnio aktywny</b-th>
           </b-tr>
        </b-thead>
         <b-tbody>
      <b-tr @click="newTab">
     
        <b-th class="text-right">Jan </b-th>
        <b-td/>
        <b-td/>
        <b-td/>
        <b-td>22 min</b-td>
      </b-tr>
      </b-tbody>
   </b-table-simple>

    </b-card>
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
    data() {
      return {
        tabs: [],
        params:[],
        msgs:[],
        tabCounter: 0,
        msgCounter: 0,
        Chat:{
          message: "",

        }
      }
    },
    methods: {
      closeTab(x) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i] === x) {
            this.tabs.splice(i, 1)
          }
        }
      },
      newTab() {
        this.tabs.push(this.tabCounter++)
      },
      send() {
        
        this.Chat.message=this.Chat.messagewrited,
        this.msgs.puch(this.msgCounter++),
      params.push('subject',this.Chat.message)
      axios.post(`http://localhost:3309/newchat`, params)
        .then(response => {
          this.response = response.data
          console.log(response.data)
          this.showResponse = true
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    }
  }
</script>
<style scoped>
.wrap{
   overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
.messages{
   max-height: 20em;
  overflow:auto;
}
.chat{
  width:20rem;
}
.received{
  float: left;
  overflow-wrap: normal;
}
.send{
  float: right;
  word-wrap: normal;
}
</style>