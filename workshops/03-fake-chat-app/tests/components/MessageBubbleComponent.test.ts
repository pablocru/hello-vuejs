import { enableAutoUnmount, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import MessageBubbleComponent from "../../src/components/chat/MessageBubbleComponent.vue";
import type { ChatMessage } from "../../src/types/chat.type";

describe("Component: MessageBubbleComponent", () => {
  enableAutoUnmount(afterEach);

  it("should render own message", () => {
    const ownMessageBubble: ChatMessage = {
      id: 1,
      itsMine: true,
      message: "This is my message",
    };

    const wrapper = mount(MessageBubbleComponent, { props: ownMessageBubble });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("p").text()).toBe(ownMessageBubble.message);
  });

  it("should render received message with an image", () => {
    const receivedMessageBubble: ChatMessage = {
      id: 1,
      itsMine: false,
      message: "This is a received message",
      image: "https://yesno.wtf/assets/no/28-e19b6f658f621f7c5980a33f8249a65d.gif",
    };

    const wrapper = mount(MessageBubbleComponent, { props: receivedMessageBubble });

    expect(wrapper.find("img").exists()).toBeTruthy();
    expect(wrapper.find("img").attributes("src")).toBe(receivedMessageBubble.image);
  });
});
