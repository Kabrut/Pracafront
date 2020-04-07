<template  xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="chat">
    <b-card no-body>
        <div class="chat-title"><h1><center>Czat</center></h1></div>

           <b-tabs card>
        <b-tab class="messages" v-for="tab in tabs" :key="'dyn-tab-' + tab" :title="imie[tab].name">
            <template v-slot:title>
               <strong>{{imie[tab].name}}</strong><b-button variant="none" @click="closeTab(tab)"><b>X</b></b-button>
            </template>
         <div class="messages" v-for="message in Chat" v-if="(message.user.mail === localemail && message.user1.mail === imie[tab].mail) || (message.user1.mail === localemail && message.user.mail === imie[tab].mail) ">
           <div class="send" >
               <b-badge variant="secondary" v-if="(message.user.mail === localemail && message.user1.mail === imie[tab].mail)" >
                   <div class="wrap">{{message.content}}</div>
               </b-badge>
           </div>
          <div class="received" v-if="(message.user1.mail === localemail && message.user.mail === imie[tab].mail)">
              <b-badge variant="primary" v-if="message.content !==' '">{{message.content}}</b-badge>
          </div>
          </div>
          <b-input v-model="Chat.message" @keyup.enter="send(imie[tab].mail)"/>
        </b-tab>
        <template v-slot:empty>
          <div class="text-center text-muted">
            Brak otwartych czatów<br>
          </div>
        </template>

      </b-tabs>
        <b-table-simple striped hover responsive>
            <b-button block href="#" v-b-toggle.accordion-1 variant="info">Studenci</b-button>
           <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
               <b-card-body>
                   <b-input placeholder="Wyszukaj" v-model="search" />
                   <b-table striped hover :items="List" :filter="search" selectable select-mode='single' @row-selected="newTab" :fields="fields">
                       <template v-slot:cell(msg)="row">
                           <b-button router-link to="/Mail" size="sm" class="mr-2" variant="outline-info" @click="chatmsgs(row.item.mail)">
                               <img src="@/assets/envelope.png" class="img"/>
                           </b-button>
                       </template>
                   </b-table>

               </b-card-body>
           </b-collapse>
            <b-button block href="#" v-b-toggle.accordion-2 variant="info">Wykladowcy</b-button>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <b-input placeholder="Wyszukaj" v-model="filters.search" />
                    <b-table striped hover ref="table" :filter="filters.role" :items="List" selectable select-mode='single' @row-selected="newTab" :fields="fields">

                    </b-table>
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
              {key: 'surname', label: 'Nazwisko'},
              {key: 'msg', label: 'Wiadomość'}],
        tabs: [],
        params:[],
        msgs:[],
          List:[],
        tabCounter: 0,
        msgCounter: 0,
        Chat:{
          message: "",

        },
          imie:[],
          localemail: this.$store.state.user.mail,
          filters: {
              search: '',
              role: 'teacher'
          },
          search: ''

      }

    },
    watch: {
        filters: {
            handler: function () {
                this.$refs.table.refresh()
            },
            deep: true
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
          params.append('email',this.$store.state.user.mail)
          axios.post(`http://localhost:3309/newChat`, params)
              .then(response => {
                  this.response = response.data
                  console.log(response.data)
                  this.showResponse = true
                  this.getChat()
                  this.Chat.message=""
              })
              .catch(e => {
                  this.errors.push(e)
              })
      },
        getChat(){
          var params = new URLSearchParams;
            params.append('email',this.$store.state.user.mail)
                axios.get(`http://localhost:3309/showChat`,{params})
                    .then(response => {
                        var sorted = response.data
                        sorted.sort(function (a,b){
                            if (a.time > b.time) return 1;
                            if (a.time < b.time) return -1;
                            return 0
                        });
                        this.Chat = sorted;
                        console.log(response.Chat)
                    })
                    .catch(e => {
                        this.errors.push("cos nie pyklo")
                    })

        },
        getList(ctx,callback){
            axios.get(`http://localhost:3309/getList`)
                .then(response => {
                    this.List = response.data.reverse()
                })
                .catch(e => {
                    this.errors.push("cos nie pyklo")
                })
        },
        wyslane(user) {
            user===this.$store.state.user.mail;
        },
        chatmsgs(email){
          sessionStorage.setItem('msg', email)
        }
    },
    mounted() {
        this.getList()
        this.getChat();
    }
}
</script>
<style scoped>
.wrap{
    overflow-wrap: break-word;

}
.messages{
    display:block;
   max-height:20em;
  overflow:auto;
}
.chat{
  width:25rem;

}
.received{
  float: left;
  overflow-wrap: normal;
}
.send{
  float: right;
  word-wrap: normal;
}
    .chat-title{
        background: rgba(0,0,0,.04);
        padding:25px;
        padding-bottom:0!important;
    }
    .img{
        width: 20px;
        height: 20px;
    }
</style>