<template>
    <div class='new'>
        <b-card>
            <b-card-header>
                Nowy post 
            </b-card-header>
            <b-card-content>
                <b-form-textarea/>
            </b-card-content>
            <b-card-footer><b-button> Wyślij </b-button> &nbsp <b-button> Dodaj plik </b-button></b-card-footer>
        </b-card>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>

.new b-card{
    background:cadetblue;
}

</style>