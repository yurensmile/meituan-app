<template lang="html">
    <dl class="m-sum-card">
        <dt>
                <h1>{{ meta.name }}</h1>
        <el-rate v-model="rate" disabled/>
        <span>{{ Number(meta.biz_ext.rating) || rate}}分</span>
        <span>人均￥{{ Number(meta.biz_ext.cost)}}</span>
        <ul>
            <li @click="openMap(meta.location)">地址： {{ meta.address}}</li>
            <li>电话：{{ meta.tel }}</li>
        </ul>
    
        </dt>

    </dl>    
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

