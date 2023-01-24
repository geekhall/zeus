
<template>
  <h1>Home</h1>
  <hr />
  <p>Home page</p>
  <Counter />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const cnt = computed(() => store.state.count);
</script>

<style lang="less" scoped>
</style>
