<template>
  <div class="flex items-center space-x-3">
    <div class="font-bold text-lg">{{ item.name }}</div>
    <input
      :value="item.value"
      @input="$emit('update:value', $event.target.value)"
      class="neo-input flex-1 text-sm"
      :placeholder="`Enter value for ${item.name}...`"
    />
    <div class="text-sm opacity-75">ID: {{ item.id }}</div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

defineEmits(["update:value"]);
</script>
