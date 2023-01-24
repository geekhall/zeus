<template>
  <div class="counter">
    <h3>Counter</h3>
    <hr />
    <h2>{{ cnt }}</h2>
    <p>Counter page</p>
    <el-button type="primary" @click="increase">Increase</el-button>
    <el-button type="primary" @click="decrease">Decrease</el-button>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const cnt = computed(() => store.state.count);
const increase = () => store.commit("increment", { amount: 2 });
const decrease = () => store.commit("decrement", { amount: 2 });
</script>

<style lang="scss" scoped>
.counter {
  width: 100%;
  height: 100px;
}
</style>
