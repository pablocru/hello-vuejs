import { enableAutoUnmount, mount, VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import MessageInputComponent from "../../src/components/chat/MessageInputComponent.vue";

const INPUT_SELECTOR = "input[type='text']";
const INPUT_MESSAGE = "Hello, World!";
const INVALID_INPUT_MESSAGE_LIST = ["", " ", "  ", "   "];

enum TriggerEvent {
  click = "click",
  enter = "keypress.enter",
}

enum EmitEvent {
  sendMessage = "sendMessage",
}

type MessageInputRefValues = Partial<{ message: string }>;

describe("Component: MessageInputComponent", () => {
  enableAutoUnmount(afterEach);

  it("should render input and button elements", () => {
    const wrapper = mount(MessageInputComponent);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(INPUT_SELECTOR).exists()).toBeTruthy();
    expect(wrapper.find("button").exists()).toBeTruthy();
    expect(wrapper.find("button svg").exists()).toBeTruthy();
  });

  it(
    getEmittedEventTestDescription(EmitEvent.sendMessage, TriggerEvent.click),
    async () => {
      const wrapper = mount(MessageInputComponent);

      await wrapper.find(INPUT_SELECTOR).setValue(INPUT_MESSAGE);
      await wrapper.find("button").trigger(TriggerEvent.click);

      checkMessageIsEmitted(wrapper, INPUT_MESSAGE);
      checkMessageReset(wrapper);
    },
  );

  it(
    getNotEmitEventTestDescription(EmitEvent.sendMessage, TriggerEvent.click),
    async () => {
      const wrapper = mount(MessageInputComponent);

      for (const invalidInputMessage of INVALID_INPUT_MESSAGE_LIST) {
        await wrapper.find(INPUT_SELECTOR).setValue(invalidInputMessage);
        await wrapper.find("button").trigger(TriggerEvent.click);

        checkMessageIsNotEmitted(wrapper);
        checkMessageIsKept(wrapper, invalidInputMessage);
      }
    },
  );

  it(
    getEmittedEventTestDescription(EmitEvent.sendMessage, TriggerEvent.enter),
    async () => {
      const wrapper = mount(MessageInputComponent);

      const inputElement = wrapper.find(INPUT_SELECTOR);

      await inputElement.setValue(INPUT_MESSAGE);
      await inputElement.trigger(TriggerEvent.enter);

      checkMessageIsEmitted(wrapper, INPUT_MESSAGE);
      checkMessageReset(wrapper);
    },
  );

  it(
    getNotEmitEventTestDescription(EmitEvent.sendMessage, TriggerEvent.enter),
    async () => {
      const wrapper = mount(MessageInputComponent);

      const inputElement = wrapper.find(INPUT_SELECTOR);

      for (const invalidInputMessage of INVALID_INPUT_MESSAGE_LIST) {
        await inputElement.setValue(invalidInputMessage);
        await inputElement.trigger(TriggerEvent.enter);

        checkMessageIsNotEmitted(wrapper);
        checkMessageIsKept(wrapper, invalidInputMessage);
      }
    },
  );
});

function getEmittedEventTestDescription(
  emitEvent: EmitEvent,
  triggerEvent: TriggerEvent,
) {
  return (
    `should emit '${emitEvent}' event when '${triggerEvent}' is triggered,` +
    " with the message value, and then clear the message 'ref'"
  );
}

function getNotEmitEventTestDescription(
  emitEvent: EmitEvent,
  triggerEvent: TriggerEvent,
) {
  return (
    `should not emit '${emitEvent}' event when '${triggerEvent}' is triggered` +
    " with invalid message value, and keep the message 'ref' as it is"
  );
}

function checkMessageIsEmitted(wrapper: VueWrapper, message: string) {
  expect(wrapper.emitted(EmitEvent.sendMessage)?.[0]).toEqual([message]);
}

function checkMessageIsNotEmitted(wrapper: VueWrapper) {
  expect(wrapper.emitted(EmitEvent.sendMessage)).toBeUndefined();
}

function checkMessageReset(wrapper: VueWrapper) {
  expect((wrapper.vm as MessageInputRefValues).message).toBe("");
}

function checkMessageIsKept(wrapper: VueWrapper, message: string) {
  expect((wrapper.vm as MessageInputRefValues).message).toBe(message);
}
