import { enableAutoUnmount, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import MessageFeedComponent from "../../src/components/chat/MessageFeedComponent.vue";
import { sleep } from "../../src/helpers/sleep.helper";
import type { ChatMessage } from "../../src/types/chat.type";

const MESSAGE_FEED: ChatMessage[] = [
  {
    id: 1,
    itsMine: true,
    message: "This is my message",
  },
  {
    id: 2,
    itsMine: false,
    message: "This is your message",
    image: "https://yesno.wtf/assets/yes/2-5df1b403f2654fa77559af1bf2332d7a.gif",
  },
  {
    id: 3,
    itsMine: true,
    message: "This is my message",
  },
  {
    id: 4,
    itsMine: false,
    message: "This is your message",
    image: "https://yesno.wtf/assets/yes/2-5df1b403f2654fa77559af1bf2332d7a.gif",
  },
  {
    id: 5,
    itsMine: true,
    message: "This is my message",
  },
  {
    id: 6,
    itsMine: false,
    message: "This is your message",
    image: "https://yesno.wtf/assets/yes/2-5df1b403f2654fa77559af1bf2332d7a.gif",
  },
  {
    id: 7,
    itsMine: true,
    message: "This is my message",
  },
  {
    id: 8,
    itsMine: false,
    message: "This is your message",
    image: "https://yesno.wtf/assets/yes/2-5df1b403f2654fa77559af1bf2332d7a.gif",
  },
];

describe("Component: MessageBubbleComponent", () => {
  enableAutoUnmount(afterEach);

  it("should render message feed", () => {
    const wrapper = mount(MessageFeedComponent, { props: { messageFeed: [] } });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render a 'MessageBubbleComponent' for each message in the feed", () => {
    const wrapper = mount(MessageFeedComponent, { props: { messageFeed: MESSAGE_FEED } });

    const chatBubleList = wrapper.findAllComponents({ name: "MessageBubbleComponent" });

    expect(chatBubleList).toHaveLength(MESSAGE_FEED.length);
  });

  it("should scroll to the bottom of the feed when a new message is added", async () => {
    const wrapper = mount(MessageFeedComponent, { props: { messageFeed: MESSAGE_FEED } });

    const scrollSpy = vi.fn();

    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;

    chatRef.scrollTo = scrollSpy;

    await wrapper.setProps({
      messageFeed: [
        ...MESSAGE_FEED,
        { id: 9, itsMine: true, message: "This is my message" },
      ],
    });

    await sleep();

    expect(scrollSpy).toHaveBeenCalled();
    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: "smooth",
      top: chatRef.scrollHeight,
    });
  });
});
