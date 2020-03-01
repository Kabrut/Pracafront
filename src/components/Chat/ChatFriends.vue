<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="chat">
    <b-card no-body>
       <b-tabs card>
        <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="imie[i].name">
         <div class="messages" v-for="j in Chat" :key="'dyn-msg'+j">
           <div class="send">
               <b-badge variant="secondary" >
                   <div class="wrap">{{Chat.message}}</div>
               </b-badge>
           </div>
          <div class="received">
              <b-badge variant="primary">Tak będzie wyglądała wiadomość otrzymana</b-badge>
          </div>
          </div>
            {{imie[i].mail}}
          <b-input v-model="Chat.message" @keyup.enter="send(imie[i].mail)"/>
          <b-button size="sm" variant="danger" class="float-right" @click="closeTab(i)">
            X
          </b-button>
        </b-tab>
        <template v-slot:empty>
          <div class="text-center text-muted">
            Brak otwartych czatów<br>
          </div>
        </template>

      </b-tabs>
        <b-table-simple striped hover responsive>
            <b-button block href="#" v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
           <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
               <b-card-body>
                   <b-table striped hover :items="List" selectable select-mode='single' @row-selected="newTab" :fields="fields">

                   </b-table>

               </b-card-body>
           </b-collapse>
            <b-button block href="#" v-b-toggle.accordion-2 variant="info">Accordion 2</b-button>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <b-table striped hover :items="List" :fields="fields"/>
                </b-card-body>
            </b-collapse>

   </b-table-simple>

    </b-card>
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
    data() {
      return {
          fields:[{key: 'name', label: 'Imie',},
              {key: 'surname', label: 'Nazwisko'}],
        tabs: [],
        params:[],
        msgs:[],
          List:[],
        tabCounter: 0,
        msgCounter: 0,
        Chat:{
          message: "",

        },
          imie:[]
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
      newTab(item) {
          this.imie[this.tabCounter] = item[0]
        this.tabs.push(this.tabCounter++)


      },
      send(name) {
          var params = new URLSearchParams();
          params.append('receiver',name)
          console.log(name)
          params.append('msg',this.Chat.message);
          params.append('email',localStorage.email)
          axios.post(`http://localhost:3309/newChat`, params)
              .then(response => {
                  this.response = response.data
                  console.log(response.data)
                  this.showResponse = true
              })
              .catch(e => {
                  this.errors.push(e)
              })
      },

      //   this.Chat.message=this.Chat.messagewrited,
      //   this.msgs.push(this.msgCounter++),
      // params.push('subject',this.Chat.message)
      // axios.post(`http://localhost:3309/newchat`, params)
      //   .then(response => {
      //     this.response = response.data
      //     console.log(response.data)
      //     this.showResponse = true
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //   })

        getList(){
            axios.get(`http://localhost:3309/getList`)
                .then(response => {
                    this.List = response.data.reverse()
                })
                .catch(e => {
                    this.errors.push("cos nie pyklo")
                })
        }
    },
    mounted() {
        this.getList()
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