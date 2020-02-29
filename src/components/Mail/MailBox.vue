<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div id="MailBox">
  <div class="buttons">
    <b-button> Dodaj do sprawdzonych </b-button>
    <b-button> Usuń </b-button>
  </div>
    <b-tabs  content-class="mt-3">
    <b-tab title="Odebrane" active>
        <b-table striped outlined selectable select-mode='single' hover :items="items" :fields="fields" @row-selected="toChild" responsive="sm">
            <template v-slot:cell(checkbox)>
                <input type="checkbox"/>
            </template>
        </b-table>
    </b-tab>
    <b-tab title="Wysłane">
    <b-table striped outlined selectable select-mode='single' hover :items="items" :fields="fields" @row-selected="toChild"></b-table>
    </b-tab>
    <b-tab title="Sprawdzone">
   <b-table striped outlined selectable select-mode='single' hover :items="items" :fields="fields" @row-selected="toChild"><input type="checkbox"/></b-table>
    </b-tab>
    <b-tab title-link-class="newmail" title="Nowa wiadomość" >

      <NewMail/>
      <!-- <b-form-group label="Odbiorca">
        <b-form-input placeholder="Odbiorca"/>
      </b-form-group>
      <b-form-group label="Wiadomość">
        <b-form-textarea placeholder="Treść" rows="10" max-rows="25"/>
      </b-form-group> -->

    </b-tab>
  </b-tabs>
  <div>
    
    
</div>
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
            {key: 'msgid', label:'Data'},
        {key: 'user.mail', label:'Adresat'},
        {key:'subject',label:"Temat"}],
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
    toChild (items) {
      this.selected = items;
      this.$emit('selectedMsg',this.selected)
    }
  },
    mounted () {
    this.showMessages()
  }
    
    
}
</script>

<style scoped>
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