<template>
    <div>
        <div class="page">
            <h3><center>Dodaj starostę</center></h3>
            <div class="form">
                <b-card>
                    <b-form >
                        <b-form-group label="Email">
                            <b-form-input v-model="Register.email" type='email' placeholder="Email"/>
                        </b-form-group>
                        <b-form-group label="Imie">
                            <b-form-input v-model="Register.name" type='text' placeholder="Imie"/>
                        </b-form-group>
                        <b-form-group label="Nazwisko">
                            <b-form-input v-model="Register.surname" type='text' placeholder="Nazwisko"/>
                        </b-form-group>
                        <b-form-group label="Hasło">
                            <b-form-input v-model="Register.password" type='password' placeholder="Hasło"/>
                        </b-form-group>
                        <b-form-group label="Potwierdź hasło">
                            <b-form-input v-model="Register.password2" type='password' placeholder="Hasło"/>
                        </b-form-group>
                        <b-form-group label="Kierunek">
                            <b-form-input v-model="Register.field" type='field' placeholder="Kierunek"/>
                        </b-form-group>
                        <b-form-group label="Grupa">
                            <b-form-input v-model="Register.group" type='group' placeholder="Grupa"/>
                        </b-form-group>
                        <div class="submit">
                            <b-button @click="checkpasswords()">Zarejestruj</b-button>
                        </div>
                    </b-form>
                </b-card>
            </div>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>