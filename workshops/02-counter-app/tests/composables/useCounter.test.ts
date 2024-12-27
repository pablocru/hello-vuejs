import { useCounter } from "@/composables/useCounter";

describe("Composable: Counter", () => {
  it("should be defined", () => {
    const counterComposable = useCounter({ initialValue: 0 });

    expect(counterComposable).toBeDefined();
  });

  // To ensure that global counter increases and decreases in same amount
  const initialValue = 5;
  const modifyTimes = 5;

  it("should initialize counters with provided initial values", () => {
    const { counter, globalCounter, squareCounter } = useCounter({ initialValue });

    expect(counter.value).toBe(initialValue);
    expect(squareCounter.value).toBe(initialValue ** 2);
    expect(globalCounter.value).toBe(0);
  });

  it("should interment counters correctly", () => {
    const { counter, globalCounter, squareCounter, increaseCounter } = useCounter({
      initialValue,
    });

    for (let i = 0; i < modifyTimes; i++) {
      increaseCounter();
    }
    const incrementedValue = initialValue + modifyTimes;

    expect(counter.value).toBe(incrementedValue);
    expect(squareCounter.value).toBe(incrementedValue ** 2);
    expect(globalCounter.value).toBe(modifyTimes);
  });

  it("should decrement counters correctly", () => {
    const { counter, globalCounter, squareCounter, decreaseCounter } = useCounter({
      initialValue,
    });

    for (let i = 0; i < modifyTimes; i++) {
      decreaseCounter();
    }
    const decrementedValue = initialValue - modifyTimes;

    expect(counter.value).toBe(decrementedValue);
    expect(squareCounter.value).toBe(decrementedValue ** 2);
    expect(globalCounter.value).toBe(decrementedValue);
  });
});
