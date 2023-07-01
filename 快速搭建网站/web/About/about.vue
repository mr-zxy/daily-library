<template>
    <div>
       <p> Count:{{count}}</p>
        <button @click="countPlus">点我+1</button>
    </div>
</template>
<script setup>
    import {ref} from "vue"
    const count=ref(0)
    const countPlus=()=>{
        count.value++
    }
</script>
<style>
p{
    color: red;
}
</style>