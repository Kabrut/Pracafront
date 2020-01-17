<template>
<div id="mail">
    <div class="mailbox">
    <MailBox/>
    </div>
    <div class="ReceivedMail">
    <ReceivedMail/></div>
</div>
</template>

<script>
    import MailBox from "../components/Mail/MailBox";
    import ReceivedMail from "../components/Mail/ReceivedMail";
    export default {
        name: "Mail",
        components: {  MailBox, ReceivedMail}
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