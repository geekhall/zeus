
<template>
  <h1>About</h1>
  <hr />
  <p>About page</p>
  <h2 color="white">{{ cnt }}</h2>
  <el-button type="primary" @click="increase">Increase</el-button>
  <el-button type="primary" @click="decrease">Decrease</el-button>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const cnt = computed(() => store.state.count);
const increase = () => store.commit("increment", { amount: 2 });
const decrease = () => store.commit("decrement", { amount: 2 });
</script>

<style lang="less" scoped>
</style>
