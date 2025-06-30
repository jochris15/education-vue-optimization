<template>
  <div>
    <h4 class="font-bold mb-3">{{ title }}</h4>
    <div class="space-y-2">
      <div class="flex items-center space-x-2">
        <span class="text-sm">Heavy computation result:</span>
        <span class="font-bold">{{ computationResult }}</span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-sm">Mounted at:</span>
        <span class="font-mono text-xs">{{ mountTime }}</span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-sm">Random data:</span>
        <span class="font-mono text-xs">{{ randomData.slice(0, 20) }}...</span>
      </div>
    </div>
    <div class="mt-3 text-xs opacity-75">
      This component simulates heavy initialization work
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
  title: {
    type: String,
    default: "Heavy Component",
  },
});

const emit = defineEmits(["mount", "unmount"]);

const mountTime = ref("");
const computationResult = ref(0);
const randomData = ref("");

onMounted(() => {
  mountTime.value = new Date().toLocaleTimeString();

  // Simulate heavy computation
  let result = 0;
  for (let i = 0; i < 500000; i++) {
    result += Math.random();
  }
  computationResult.value = Math.round(result);

  // Generate random data
  randomData.value = Array.from({ length: 100 }, () =>
    Math.random().toString(36).substring(2)
  ).join("");

  emit("mount");
});

onUnmounted(() => {
  emit("unmount");
});
</script>
