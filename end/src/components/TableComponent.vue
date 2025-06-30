<template>
  <div>
    <h3 class="text-xl font-bold text-neo-black mb-4">📋 Data Table Component</h3>
    
    <div class="neo-card bg-neo-white p-4">
      <div class="flex justify-between items-center mb-4">
        <div class="text-sm text-neo-black">
          Showing {{ tableData.length }} entries
        </div>
        <button 
          @click="refreshData"
          class="neo-button bg-neo-green text-neo-white text-sm"
        >
          Refresh Data
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full border-4 border-neo-black">
          <thead>
            <tr class="bg-neo-blue text-neo-white">
              <th class="border-2 border-neo-black p-2 text-left">ID</th>
              <th class="border-2 border-neo-black p-2 text-left">Name</th>
              <th class="border-2 border-neo-black p-2 text-left">Value</th>
              <th class="border-2 border-neo-black p-2 text-left">Status</th>
              <th class="border-2 border-neo-black p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in tableData" 
              :key="item.id"
              class="hover:bg-neo-yellow transition-colors"
            >
              <td class="border-2 border-neo-black p-2 font-mono">{{ item.id }}</td>
              <td class="border-2 border-neo-black p-2 font-bold">{{ item.name }}</td>
              <td class="border-2 border-neo-black p-2">{{ item.value }}</td>
              <td class="border-2 border-neo-black p-2">
                <span 
                  class="px-2 py-1 text-xs font-bold border-2 border-neo-black"
                  :class="item.status === 'Active' ? 'bg-neo-green text-neo-white' : 'bg-neo-pink text-neo-white'"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="border-2 border-neo-black p-2">
                <button class="neo-button bg-neo-purple text-neo-white text-xs">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-4 text-xs text-neo-black">
        Last updated: {{ lastUpdated }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['loaded'])

const tableData = ref([])
const lastUpdated = ref('')

const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry']
const statuses = ['Active', 'Inactive']

const generateData = () => {
  return Array.from({ length: 8 }, (_, index) => ({
    id: `USR${String(index + 1).padStart(3, '0')}`,
    name: names[index],
    value: Math.floor(Math.random() * 1000),
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }))
}

const refreshData = () => {
  tableData.value = generateData()
  lastUpdated.value = new Date().toLocaleTimeString()
}

onMounted(() => {
  // Simulate loading time
  setTimeout(() => {
    refreshData()
    emit('loaded')
  }, 800)
})
</script>
