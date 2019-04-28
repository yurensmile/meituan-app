<template lang="html">
    <div class="m-sum-card">
        <h1>{{ meta.name }}</h1>
    </div>    
</template>
<script>
export default {
    props: {
        meta: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>
<style>

</style>

