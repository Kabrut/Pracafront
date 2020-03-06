<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div id="MailBox">
  <div class="buttons">
    <b-button> Dodaj do sprawdzonych </b-button>
    <b-button> Usuń </b-button>
  </div>
    <b-tabs  content-class="mt-3">
    <b-tab title="Odebrane" active>
        <b-table striped outlined selectable select-mode='single' hover :items="receive" :fields="fields" @row-selected="toChild" responsive="sm">
            <template v-slot:cell(checkbox)>
                <input type="checkbox"/>
            </template>
        </b-table>
    </b-tab>
    <b-tab title="Wysłane">
    <b-table striped outlined selectable select-mode='single' hover :items="sended" :fields="fields" >
        <template v-slot:cell(button)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Ukryj' : 'Pokaż'}} Wiadomość
            </b-button>
        </template>
        <template v-slot:row-details="row">
            <b-card>
                <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>Tytuł:</b></b-col>
                    <b-col>{{ row.item.subject}}</b-col>
                </b-row>

                <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>Zawartość:</b></b-col>
                    <p class="pre-formatted"> {{ row.item.content }}</p>
                </b-row>
            </b-card>
        </template>
    </b-table>
    </b-tab>
    <b-tab title="Sprawdzone">
   <b-table striped outlined selectable select-mode='single' hover :items="items" :fields="fields" @row-selected="toChild"><input type="checkbox"/></b-table>
    </b-tab>
    <b-tab title-link-class="newmail" title="Nowa wiadomość" >

      <NewMail/>

    </b-tab>
  </b-tabs>

</div>
</template>

<script>
import axios from 'axios';
import NewMail from "./NewMail";
import ReceivedMail from "./ReceivedMail";
export default {
   components: {NewMail,ReceivedMail},
     data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: [ {key: 'checkbox', label: ''},
            {key: 'date', label:'Data'},
        {key: 'user.mail', label:'Adresat'},
        {key:'subject',label:"Temat"},
            {key: 'user1.field.name', label:"Kierunek"},
            {key:'user1.year', label: "Rok"},
            {key:'button',label:''}],
          sended:[],
          receive:[],
        items: [],
        child: [],
        selected:[]
      }
    },
    methods: {
      showMessages () {
      axios.get(`http://localhost:3309/showMsg`)
        .then(response => {
          this.items = response.data
          console.log(response.items)
        })
        .catch(e => {
          this.errors.push("cos nie pyklo")
        })
    },
        sentt(){
            var params = new URLSearchParams();
            params.append('user1', localStorage.email)
            axios.get(`http://localhost:3309/showSent`, {params})
                .then(response => {
                    this.sended = response.data
                    console.log(response.sended)
                })
                .catch(e => {
                    this.errors.push("cos nie pyklo")
                })
        },
        received() {
            var params = new URLSearchParams();
            params.append('user', localStorage.email)
            axios.get(`http://localhost:3309/showReceived`, {params})
                .then(response => {
                    this.receive = response.data
                    console.log(response.receive)
                })
                .catch(e => {
                    this.errors.push("cos nie pyklo")
                })
        },
    toChild (items) {
      this.selected = items;
      this.$emit('selectedMsg',this.selected)
    }
  },
    mounted () {
        this.sentt()
        this.showMessages()
        this.received()
  }
    
    
}
</script>

<style scoped>
    .pre-formatted {
        white-space: pre;
    }
#MailBox{
    width:100%;
}
.newmail{
  float:right;
  background:blue; 
}
b-form-textarea{
  height:10em;
}
</style>