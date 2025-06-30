<template>
  <div>
    <h4 class="font-bold mb-2">Expensive Component</h4>
    <div class="grid grid-cols-2 gap-2 text-sm">
      <div>Memo Dependency: {{ memoDep }}</div>
      <div>Other Value: {{ otherVal }}</div>
      <div>Render Time: {{ renderTime }}</div>
      <div>Random: {{ randomValue }}</div>
    </div>
    <div class="mt-2 text-xs opacity-75">
      This component performs heavy calculations on render
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
  memoDep: {
    type: Number,
    required: true,
  },
  otherVal: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["render"]);

const renderTime = ref("");
const randomValue = ref(0);

onMounted(() => {
  // Simulate expensive calculation
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += Math.random();
  }
  randomValue.value = Math.round(sum);
  renderTime.value = new Date().toLocaleTimeString();

  emit("render");
});
</script>
