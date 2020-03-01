<template>
    <div>
        <b-button
                v-b-toggle.collapse-4
                variant="secondary"
        > Dodaj Komentarz</b-button>
        <b-collapse
                id="collapse-4"
                class="mt-2"
        >
            <b-form-textarea v-model="content"/>

            <b-button @click="newComment()">Dodaj</b-button>
        </b-collapse>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "NewComment",
        data () {
            return {
                content: '',
                id: 15
            }
        },
        methods:{
            newComment(){
                var params = new URLSearchParams();
                params.append('content',this.content);
                params.append('email', localStorage.email);
                params.append('id', this.id)


                axios.post(`http://localhost:3309/newcomment`, params)
                    .then(response => {
                        this.response = response.data
                        //console.log(response.data)
                        this.showResponse = true
                        // location.reload(true)
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        }
    }
</script>

<style scoped>

</style>