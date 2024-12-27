<script setup lang="ts">
import CounterComponent from "./components/CounterComponent.vue";

const title = "Hello, Vue.js";
</script>

<template>
  <h1>{{ title }}</h1>

  <CounterComponent :initialValue="5" />
  <CounterComponent :initialValue="10" />
</template>
