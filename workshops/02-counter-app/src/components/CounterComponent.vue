<script setup lang="ts">
import { useCounter, type CounterProps } from "@/composables/useCounter";

const props = defineProps<CounterProps>();

const { counter, globalCounter, squareCounter, decreaseCounter, increaseCounter } =
  useCounter(props);
</script>

<template>
  <section>
    <h2>Counter component</h2>
    <p>Counter: {{ counter }}</p>
    <p>Square counter: {{ squareCounter }}</p>
    <p>Global counter: {{ globalCounter }}</p>

    <div>
      <button @click="increaseCounter">+ 1</button>
      <button @click="decreaseCounter">- 1</button>
    </div>
  </section>
</template>
