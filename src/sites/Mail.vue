<template>
<div id="mail">
    <MailBox/>
    <div class="ReceivedMail">
    <ReceivedMail/></div>
</div>
</template>

<script>
    import MailBox from "../components/MailBox";
    import ReceivedMail from "../components/ReceivedMail";
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
}
</style>