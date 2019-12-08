<template>
<div id="MailBox">
  <div class="buttons">
    <b-button> Dodaj do sprawdzonych </b-button>
    <b-button> Usuń </b-button>
  </div>
    <b-tabs  content-class="mt-3">
    <b-tab title="Odebrane" active>
        <b-table striped outlined selectable hover :items="items" :fields="fields"></b-table>
    </b-tab>
    <b-tab title="Wysłane">
    <b-table striped outlined selectable hover :items="items" :fields="fields"></b-table>
    </b-tab>
    <b-tab title="Sprawdzone">
   <b-table striped outlined selectable hover :items="items" :fields="fields"><input type="checkbox"/></b-table>
    </b-tab>
    <b-tab title-link-class="newmail" title="Nowa wiadomość" >
      <b-form-group label="Odbiorca">
        <b-form-input placeholder="Odbiorca"/>
      </b-form-group>
      <b-form-group label="Wiadomość">
        <b-form-textarea placeholder="Treść" rows="10" max-rows="25"/>
      </b-form-group>

    </b-tab>
  </b-tabs>
  <div>
 
    
</div>
</div>
</template>

<script>
export default {
     data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: ['first_name',  'Date'],
        items: [
          { isActive: true, Date: '29.11.15', first_name: 'Dickerson', content: 'Lorem ipsum'},
          { isActive: false, Date: '11.11.11', first_name: 'Larsen'},
          { isActive: false, Date: '13.13.31', first_name: 'Geneva'},
          { isActive: true, Date: '22.22.22', first_name: 'Jami'}
        ]
      }
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