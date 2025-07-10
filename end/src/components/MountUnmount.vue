<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
  title: {
    type: String,
    default: "Simple Component",
  },
});

const emit = defineEmits(["mount", "unmount"]);

const mountTime = ref("");

onMounted(() => {
  mountTime.value = new Date().toLocaleTimeString();
  emit("mount");
});

onUnmounted(() => {
  emit("unmount");
});
</script>


<template>
  <div class="text-neo-black">
    <h4 class="font-bold mb-3">{{ title }}</h4>
    <div class="space-y-2">
      <div class="flex items-center space-x-2">
        <span class="text-sm">Mounted at:</span>
        <span class="font-mono text-xs">{{ mountTime }}</span>
      </div>
    </div>
    <div class="mt-3 text-xs opacity-75">
      This component demonstrates mount/unmount behavior
    </div>
  </div>
</template>

