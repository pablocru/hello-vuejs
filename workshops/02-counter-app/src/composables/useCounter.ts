import { computed, ref } from "vue";

interface CounterProps {
  initialValue: number;
}

// Global properties
const globalCounter = ref(0);

function useCounter({ initialValue }: CounterProps) {
  // Properties
  const counter = ref(initialValue);
  const squareCounter = computed(() => counter.value ** 2);

  // Methods
  function increaseCounter() {
    counter.value++;
    globalCounter.value++;
  }
  function decreaseCounter() {
    counter.value--;
    globalCounter.value--;
  }

  return {
    // Getters
    globalCounter: computed(() => globalCounter.value),
    counter: computed(() => counter.value),
    squareCounter: computed(() => squareCounter.value),

    // Methods
    decreaseCounter,
    increaseCounter,
  };
}

export { useCounter };
export type { CounterProps };
