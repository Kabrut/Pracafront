<template>
    <div>
        <b-form title="Ogólne">
            <b-card title="Użytkownik"></b-card>
           <div class="field"> <b-label>Imie</b-label></div><br>
            <div class="field"><b-label>Nazwisko</b-label></div><br>
            <div class="field"><b-label>E-mal</b-label></div><br>
            <div class="field"><b-label>Hasło</b-label></div><br>
            <div class="field"><b-button v-b-modal.modal-1>Zmień hasło</b-button></div><br>
            <b-modal id="modal-1" title="Zmiana hasła">
                <p class="my-4">
                <b-form-group label="Podaj stare hasło: ">
                 <b-form-input type='password' placeholder="Hasło"/>
                </b-form-group>
                 <b-form-group label="Podaj stare hasło: ">
                 <b-form-input type='password' placeholder="Hasło"/>
                </b-form-group>
                <b-form-group label="Potwierdź hasło">
                 <b-form-input type='password' placeholder="Hasło"/>
             </b-form-group></p>
            </b-modal>
        </b-form>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.field{
    padding:2,5px;
}
</style>