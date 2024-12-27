import { sleep } from "@/helpers/sleep.helper";
import type { ChatMessage } from "@/types/chat.type";
import type { YesNoApiResponse } from "@/types/yes-no-api.type";
import { computed, ref } from "vue";

export function useChat() {
  // Properties
  const messageFeed = ref<ChatMessage[]>([]);

  // Methods
  async function sendMessage(theMessage: string) {
    messageFeed.value.push({
      id: new Date().getMilliseconds(),
      itsMine: true,
      message: theMessage,
    });

    if (!theMessage.endsWith("?")) return;

    await sleep();

    const { answer, image } = await receiveMessage();

    messageFeed.value.push({
      id: new Date().getMilliseconds(),
      itsMine: false,
      message: answer,
      image,
    });
  }

  async function receiveMessage(): Promise<YesNoApiResponse> {
    const response = await fetch("https://yesno.wtf/api");
    const data = await response.json();

    return data;
  }

  return {
    // Getters
    messageFeed: computed(() => messageFeed.value),

    // Methods
    sendMessage,
  };
}
