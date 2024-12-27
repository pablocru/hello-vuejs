<script setup lang="ts">
import type { ChatMessage } from "@/types/chat.type";
import { onUpdated, ref } from "vue";
import MessageBubble from "./MessageBubbleComponent.vue";

interface MessageFeedProps {
  messageFeed: ChatMessage[];
}

const props = defineProps<MessageFeedProps>();

const chatRef = ref<HTMLDivElement>();

onUpdated(() => {
  setTimeout(() => {
    chatRef.value?.scrollTo({ top: chatRef.value.scrollHeight, behavior: "smooth" });
  }, 100);
})
</script>

<template>
  <div class="flex-1 overflow-y-auto p-4" ref="chatRef">
    <div class="flex flex-col space-y-2">
      <MessageBubble v-for="message in props.messageFeed" :key="message.id" v-bind="message" />
    </div>
  </div>
</template>
