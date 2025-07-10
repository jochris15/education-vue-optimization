<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['loaded'])

const chartCanvas = ref(null)
const chartType = ref('Bar Chart')
const dataPoints = ref([])
const lastUpdated = ref('')

const generateNewData = () => {
  dataPoints.value = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100))
  lastUpdated.value = new Date().toLocaleTimeString()
  drawChart()
}

const drawChart = () => {
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  const canvas = chartCanvas.value
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Set styles
  ctx.fillStyle = '#ff006e'
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2
  
  // Draw bars
  const barWidth = canvas.width / dataPoints.value.length
  const maxValue = Math.max(...dataPoints.value)
  
  dataPoints.value.forEach((value, index) => {
    const barHeight = (value / maxValue) * (canvas.height - 20)
    const x = index * barWidth
    const y = canvas.height - barHeight
    
    // Draw bar
    ctx.fillRect(x + 2, y, barWidth - 4, barHeight)
    ctx.strokeRect(x + 2, y, barWidth - 4, barHeight)
    
    // Draw value label
    ctx.fillStyle = '#000000'
    ctx.font = '12px monospace'
    ctx.fillText(value.toString(), x + barWidth/2 - 10, y - 5)
    ctx.fillStyle = '#ff006e'
  })
}

onMounted(() => {
  // Simulate component loading time
  setTimeout(() => {
    generateNewData()
    emit('loaded')
  }, 500)
})
</script>

<template>
  <div>
    <h3 class="text-xl font-bold text-neo-black mb-4">📊 Interactive Chart Component</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="neo-card bg-neo-pink p-4">
        <canvas ref="chartCanvas" width="200" height="150" class="w-full"></canvas>
      </div>
      <div class="space-y-2">
        <div class="text-sm text-neo-black">
          <strong>Chart Type:</strong> {{ chartType }}
        </div>
        <div class="text-sm text-neo-black">
          <strong>Data Points:</strong> {{ dataPoints.length }}
        </div>
        <div class="text-sm text-neo-black">
          <strong>Last Updated:</strong> {{ lastUpdated }}
        </div>
        <button 
          @click="generateNewData"
          class="neo-button bg-neo-blue text-neo-white text-sm"
        >
          Refresh Data
        </button>
      </div>
    </div>
  </div>
</template>


