import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MessageFeed from "../../src/components/chat/MessageFeedComponent.vue";
import MessageInput from "../../src/components/chat/MessageInputComponent.vue";
import { sleep } from "../../src/helpers/sleep.helper";
import ChatView from "../../src/views/ChatView.vue";

describe("View: ChatView", () => {
  it("should render chat view", () => {
    const wrapper = mount(ChatView);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.findComponent(MessageFeed).exists()).toBeTruthy();
    expect(wrapper.findComponent(MessageInput).exists()).toBeTruthy();
  });

  it("should receive an input message when '@send-message' event is emitted", async () => {
    const wrapper = mount(ChatView, {
      global: {
        stubs: {
          MessageFeed: {
            // Mocking the `MessageFeed` component to avoid `scrollTo()` error
            template: "<div>Mock Chat Feed</div>",
          },
        },
      },
    });

    const inputMessage = "Hello!";

    const messageInput = wrapper.findComponent(MessageInput);
    messageInput.vm.$emit("sendMessage", inputMessage);

    await sleep();

    expect(messageInput.emitted("sendMessage")).toBeTruthy();
    expect(messageInput.emitted("sendMessage")?.[0]).toEqual([inputMessage]);
  });
});
