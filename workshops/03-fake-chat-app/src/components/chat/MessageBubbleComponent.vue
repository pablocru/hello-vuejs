<script setup lang="ts">
import type { ChatMessage } from "@/types/chat.type";
import { reactive } from "vue";

const { itsMine, message, image } = defineProps<ChatMessage>();

const messageBubbleClass = reactive({
  "justify-end": itsMine,
});

const messageContentClass = reactive({
  "bg-blue-200": itsMine,
  "bg-gray-300": !itsMine,
});
</script>

<template>
  <div class="flex" :class="messageBubbleClass">
    <div class="text-black p-2 rounded-lg max-w-xs" :class="messageContentClass">
      <p>{{ message }}</p>
      <img v-if="image" :src="image" alt="YesNoImage" />
    </div>
  </div>
</template>
