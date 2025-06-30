<template>
  <div class="relative">
    <div 
      v-if="isLoading" 
      class="w-full h-48 bg-neo-yellow border-2 border-neo-black flex items-center justify-center"
    >
      <div class="text-center">
        <div class="text-2xl mb-2">⏳</div>
        <div class="font-bold text-neo-black">Loading image...</div>
      </div>
    </div>
    
    <img 
      v-show="!isLoading"
      ref="imageRef"
      :src="imageSrc"
      :alt="alt"
      class="w-full h-48 object-cover border-2 border-neo-black"
      @load="onImageLoad"
      @error="onImageError"
    />
    
    <div 
      v-if="hasError" 
      class="w-full h-48 bg-neo-pink text-neo-white border-2 border-neo-black flex items-center justify-center"
    >
      <div class="text-center">
        <div class="text-2xl mb-2">❌</div>
        <div class="font-bold">Failed to load image</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['load', 'error'])

const imageRef = ref(null)
const isLoading = ref(true)
const hasError = ref(false)
const imageSrc = ref('')
const observer = ref(null)

const onImageLoad = () => {
  isLoading.value = false
  emit('load')
}

const onImageError = () => {
  isLoading.value = false
  hasError.value = true
  emit('error')
}

const loadImage = () => {
  if (imageSrc.value) return
  
  // Simulate network delay
  setTimeout(() => {
    imageSrc.value = props.src
  }, 300 + Math.random() * 700)
}

onMounted(() => {
  // Create Intersection Observer for lazy loading
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.value?.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '50px' // Start loading 50px before image comes into view
    }
  )
  
  if (imageRef.value) {
    observer.value.observe(imageRef.value)
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>
