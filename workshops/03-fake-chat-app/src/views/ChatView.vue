<script setup lang="ts">
import MessageFeed from "@/components/chat/MessageFeedComponent.vue";
import MessageInput from "@/components/chat/MessageInputComponent.vue";
import { useChat } from "@/composables/useChat";

const { messageFeed, sendMessage } = useChat();
</script>

<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>The Boss</span>
    </div>

    <MessageFeed :message-feed="messageFeed" />

    <MessageInput @send-message="sendMessage" />
  </div>
</template>
