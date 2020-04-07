<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div id="MailBox">
    <h2>Skrzynka pocztowa</h2>

    <b-tabs  content-class="mt-3">
        <b-tab pill title-link-class="newmail" title="Nowa wiadomość" >
            <template v-slot:title>
                <div class="new">Nowa wiadomosc</div>
            </template>   <NewMail/>
        </b-tab>
    <b-tab title="Odebrane" >
        <b-table striped outlined selectable sortable select-mode='single' hover :items="receive" :fields="fields" @row-selected="toChild" responsive="sm">
            <template v-slot:cell(checkbox)>
                <input type="checkbox"/>
            </template>
            <template v-slot:cell(button)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Ukryj' : 'Pokaż'}}
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
                    <b-row>
                        <b-button @click="remove(row.item.msgid)" variant="outline-dark">Sprawdzone</b-button>
                    </b-row>
                </b-card>
            </template>
        </b-table>
    </b-tab>
    <b-tab title="Wysłane">
    <b-table striped outlined selectable select-mode='single' hover :items="sended" :fields="fields" >
        <template v-slot:cell(button)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Ukryj' : 'Pokaż'}}
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
   <b-table striped outlined selectable select-mode='single' hover :items="check" :fields="fields" @row-selected="toChild"><input type="checkbox"/>
       <template v-slot:cell(button)="row">
           <b-button size="sm" @click="row.toggleDetails" class="mr-2">
               {{ row.detailsShowing ? 'Ukryj' : 'Pokaż'}}
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
            {key: 'date', label:'Data', sortable:true},
        {key: 'user.mail', label:'Adresat'},
        {key:'subject',label:"Temat"},
            {key: 'user1.field.name', label:"Kierunek", sortable: true},
            {key:'user1.year', label: "Rok"},
            {key:'button',label:''}],
          sended:[],
          receive:[],
          check:[],
        items: [],
        child: [],
        selected:[],

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
            params.append('user1', this.$store.state.user.mail)
            axios.get(`http://localhost:3309/showSent`, {params})
                .then(response => {
                    this.sended = response.data
                    console.log(response.sended)
                })
                .catch(e => {
                    this.errors.push("cos nie pyklo")
                })
        },
        checked(){
            var params = new URLSearchParams();
            params.append('user', this.$store.state.user.mail)
            axios.get(`http://localhost:3309/showChecked`, {params})
                .then(response => {
                    this.check = response.data
                    console.log(response.check)
                })
                .catch(e => {
                    this.errors.push("cos nie pyklo")
                })
        },
        received() {
            var params = new URLSearchParams();
            params.append('user', this.$store.state.user.mail)
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
    },
        remove(id){
            var params = new URLSearchParams();
            params.append('id',id)
            axios.put(`http://localhost:3309/checked`,params)
                .then(resp =>{
                    console.log(true);
                    this.received();
                    this.checked();
                })
                .catch(e => {
                this.errors.push("cos nie pyklo")
            })
        }

  },
    mounted () {
        this.sentt()
        this.showMessages()
        this.received()
        this.checked()
  }

}
</script>

<style scoped>
    .pre-formatted {
        white-space: pre;
    }
#MailBox{
    width:70%;
    margin-left: 20%;
    margin-top: 10px;
    background:white;
    padding:25px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 25px;
}
#MailBox h2{
    padding:10px;
    margin:auto;
}
b-form-textarea{
  height:10em;
}
    .new{
        color:red;
    }
    .card{


    }
</style>