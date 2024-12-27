import { describe, expect, it, vi } from "vitest";
import { useChat } from "../../src/composables/useChat";
import { YesNoApiResponse } from "../../src/types/yes-no-api.type";

describe("Composable: useChat", () => {
  it("should be defined", () => {
    const chatComposable = useChat();

    expect(chatComposable).toBeDefined();
  });

  it("should return a message feed array and a function to add messages", () => {
    const { messageFeed, sendMessage } = useChat();

    expect(messageFeed.value).toStrictEqual([]);
    expect(sendMessage).toBeInstanceOf(Function);
  });

  it("should add a message to the feed when calling 'sendMessage'", async () => {
    const { messageFeed, sendMessage } = useChat();

    const inputMessage = "Hello!";

    await sendMessage(inputMessage);

    expect(messageFeed.value).toStrictEqual([
      {
        id: expect.any(Number),
        itsMine: true,
        message: inputMessage,
      },
    ]);
  });

  it("should add a response message with an image to the feed when calling 'sendMessage' with a question", async () => {
    const mockApiResponse: YesNoApiResponse = {
      answer: "no",
      forced: false,
      image: "https://yesno.wtf/no.gif",
    };

    window.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockApiResponse),
      } as Response),
    );

    const { messageFeed, sendMessage } = useChat();

    const inputMessage = "Is it raining?";

    await sendMessage(inputMessage);

    expect(messageFeed.value).toStrictEqual([
      {
        id: expect.any(Number),
        itsMine: true,
        message: inputMessage,
      },
      {
        id: expect.any(Number),
        itsMine: false,
        message: expect.any(String),
        image:
          expect.any(String) && expect.stringMatching(/^https:\/\/yesno\.wtf\/\S*\.gif$/),
      },
    ]);
  });
});
