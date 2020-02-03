<template>
<div id="mail">
    <div class="mailbox">
    <MailBox v-on:selectedMsg="msg"/>
    </div>
    
    <div class="ReceivedMail">
    <ReceivedMail :child='selectedMsg'/></div>
</div>
</template>

<script>
    import MailBox from "../components/Mail/MailBox";
    import ReceivedMail from "../components/Mail/ReceivedMail";
    export default {
        data () {
            return {
                selectedMsg: ''
            }
        },
        name: "Mail",
        components: {  MailBox, ReceivedMail},
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
.ReceivedMail{
    margin-top: 5px;
    width:50%;
}
.mailbox{
    width:50%;
}
</style>