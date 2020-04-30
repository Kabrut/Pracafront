<template>
    <div class="page">
        <b-form title="Ogólne">
            <b-card title="Użytkownik">
           <div class="field"> <b-label><b>Imie:</b></b-label></div>
                <b-label>{{name}}</b-label>
            <div class="field"><b-label><b>Nazwisko</b></b-label></div>
                <b-label>{{surname}}</b-label>
            <div class="field"><b-label><b>E-mal</b></b-label></div>
                <b-label>{{mail}}</b-label>
            <div class="field"><b-label><b>Kierunek</b></b-label></div>
                <b-label>{{field}}</b-label>
            <div class="field"><b-label><b>Rocznik</b></b-label></div>
                <b-label>{{year}}</b-label>
            <div class="field"><b-label><b>Grupa</b></b-label></div>
                <b-label>{{group}}</b-label>
            <div class="field"><b-button v-b-modal.modal-1 variant="outline-danger">Zmień hasło</b-button></div>

            <b-modal id="modal-1"
                     title="Zmiana hasła"
                     @ok="checkpasswords"
            >
                <p class="my-4">
                <b-form-group label="Podaj stare hasło: ">
                 <b-form-input v-model="old" type='password' placeholder="Hasło"/>
                </b-form-group>
                 <b-form-group label="Podaj stare hasło: ">
                 <b-form-input v-model="news" type='password' placeholder="Hasło"/>
                </b-form-group>
                <b-form-group label="Potwierdź hasło">
                 <b-form-input v-model="new2" type='password' placeholder="Hasło"/>
             </b-form-group></p>
            </b-modal></b-card>
        </b-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name: this.$store.state.user.name,
            surname: this.$store.state.user.surname,
            mail: this.$store.state.user.mail,
            field: this.$store.state.user.field.name,
            year: this.$store.state.user.year,
            group: this.$store.state.user.groups,
            old:'',
            news:'',
            new2:''
        }
    },
    methods:{
        checkpasswords () {
            if (this.news===this.new2){
                this.change();

            }else {alert('Hasla nie sa zgodne');
            }
        },
        change(){
            var params = new URLSearchParams;
            params.append("mail", this.mail)
            params.append('old', this.old)
            params.append('news', this.news)
            this.$http.post(`http://localhost:3309/changePassword`,params).then(response=>{
                console.log(response)
            }).catch(e=>{
                console.log("failure")
            })
        }
    }
}
</script>
<style scoped>
.field{
    padding:2,5px;
}
    .page{
        width: 70%;
        margin-left: 20%;
        margin-top: 10px;
    }
    .card{
        border-radius: 25px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>