<template>
<div id="grade">
    <div class="classes">
    <Classes/>
    <Classes/>
    <Classes/>
    <Classes/>
    <Classes/>
    </div>
</div>
</template>

<script>
    import Classes from "../components/Classes";
    export default {
        name: "Grades",
        components: {Classes}
    }
</script>

<style scoped>
#grade{
    display:flex;
    
}
.classes{
    align-items: stretch;
}
</style>