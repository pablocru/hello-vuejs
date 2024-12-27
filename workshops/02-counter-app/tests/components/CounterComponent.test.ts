import CounterComponent from "@/components/CounterComponent.vue";
import { mount } from "@vue/test-utils";

describe("Component: Counter", () => {
  it("should be defined", () => {
    const wrapper = mount(CounterComponent, {
      props: {
        initialValue: 7,
      },
    });

    expect(wrapper).toBeDefined();
  });

  it("should display the initial value prop counter, its square and a global counter", () => {
    const initialValue = 5;
    const wrapper = mount(CounterComponent, { props: { initialValue } });

    const [counter, squareCounter, globalCounter] = wrapper.findAll("p");

    expect(counter.text()).toBe(`Counter: ${initialValue}`);
    expect(squareCounter.text()).toBe(`Square counter: ${initialValue ** 2}`);
    expect(globalCounter.text()).toBe("Global counter: 0");
  });

  it("should increment counters when '+ 1' button is clicked", async () => {
    const initialValue = 2;
    const wrapper = mount(CounterComponent, { props: { initialValue } });

    const [counter, squareCounter, globalCounter] = wrapper.findAll("p");

    await wrapper.find("button").trigger("click");

    const newValue = initialValue + 1;

    expect(counter.text()).toBe(`Counter: ${newValue}`);
    expect(squareCounter.text()).toBe(`Square counter: ${newValue ** 2}`);
    expect(globalCounter.text()).toBe("Global counter: 1");
  });

  it("should decrement counters when '- 1' button is clicked twice", async () => {
    const initialValue = 3;
    const wrapper = mount(CounterComponent, { props: { initialValue } });

    const [counter, squareCounter, globalCounter] = wrapper.findAll("p");
    const [_, buttonDecrement] = wrapper.findAll("button");

    const decrementTimes = 2;
    for (let i = 0; i < decrementTimes; i++) {
      await buttonDecrement.trigger("click");
    }

    const newValue = initialValue - decrementTimes;

    expect(counter.text()).toBe(`Counter: ${newValue}`);
    expect(squareCounter.text()).toBe(`Square counter: ${newValue ** 2}`);
    expect(globalCounter.text()).toBe("Global counter: -1");
  });

  it("should share the global counter between components", async () => {
    const wrapperList = Array.from({ length: 5 }, () =>
      mount(CounterComponent, { props: { initialValue: 4 } }),
    );

    const [buttonIncrement] = wrapperList[0].findAll("button");

    const incrementTimes = 5;
    for (let i = 0; i <= incrementTimes; i++) {
      await buttonIncrement.trigger("click");
    }

    for (const wrapper of wrapperList) {
      const globalCounter = wrapper.findAll("p")[2];

      expect(globalCounter?.text()).toBe(`Global counter: ${incrementTimes}`);
    }
  });
});
