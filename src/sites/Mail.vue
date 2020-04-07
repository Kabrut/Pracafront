<template>
<div id="mail">
    <div class="mailbox">
    <MailBox v-on:selectedMsg="msg"/>
    </div>
</div>
</template>

<script>
    import MailBox from "../components/Mail/MailBox";
    export default {
        data () {
            return {
                selectedMsg: ''
            }
        },
        name: "Mail",
        components: {  MailBox},
        methods:{
        msg (value){
            this.selectedMsg = value
        }
        }
    }
</script>
<style scoped>
#mail{
    display:flex;
}

.mailbox{
    width:100%;
}
</style>