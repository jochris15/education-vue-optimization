<template>
  <div class="lazy-loading-demo">
    <div class="card">
      <h2>Lazy Loading Demo</h2>
      <p>
        Demonstrate how lazy loading reduces initial bundle size and improves 
        loading performance by loading components only when needed.
      </p>
    </div>

    <div class="demo-section">
      <h3>Bundle Size Analysis</h3>
      <div class="bundle-comparison">
        <div class="bundle-info">
          <h4>Without Lazy Loading</h4>
          <div class="bundle-stat">
            <div class="stat-value">~2.5MB</div>
            <div class="stat-label">Initial Bundle Size</div>
          </div>
          <p>All components loaded at startup</p>
        </div>
        
        <div class="bundle-info">
          <h4>With Lazy Loading</h4>
          <div class="bundle-stat">
            <div class="stat-value">~350KB</div>
            <div class="stat-label">Initial Bundle Size</div>
          </div>
          <p>Components loaded on demand</p>
        </div>
      </div>
      
      <div class="savings-indicator">
        <div class="savings-amount">85% Bundle Size Reduction</div>
        <div class="savings-description">Faster initial page load</div>
      </div>
    </div>

    <div class="demo-section">
      <h3>Dynamic Component Loading</h3>
      <p>Load heavy components only when needed</p>
      
      <div class="component-controls">
        <button 
          v-for="component in availableComponents" 
          :key="component.name"
          @click="loadComponent(component)"
          :disabled="component.loading"
          class="btn"
        >
          {{ component.loading ? 'Loading...' : `Load ${component.name}` }}
        </button>
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ loadedComponentsCount }}</div>
          <div class="stat-label">Components Loaded</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalLoadTime }}ms</div>
          <div class="stat-label">Total Load Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ savedLoadTime }}ms</div>
          <div class="stat-label">Time Saved</div>
        </div>
      </div>
      
      <div class="loaded-components">
        <component 
          v-for="component in loadedComponents" 
          :is="component.component"
          :key="component.name"
          :title="component.name"
        />
      </div>
    </div>

    <div class="demo-section">
      <h3>Image Lazy Loading</h3>
      <p>Load images only when they enter the viewport</p>
      
      <div class="image-stats">
        <div class="stat-card">
          <div class="stat-value">{{ loadedImagesCount }}</div>
          <div class="stat-label">Images Loaded</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalImagesCount }}</div>
          <div class="stat-label">Total Images</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ Math.round((savedBandwidth / 1024 / 1024) * 10) / 10 }}MB</div>
          <div class="stat-label">Bandwidth Saved</div>
        </div>
      </div>
      
      <div class="image-gallery">
        <div class="scroll-instruction">
          <p>👇 Scroll down to see lazy loading in action</p>
        </div>
        
        <LazyImage 
          v-for="(image, index) in images" 
          :key="index"
          :src="image.src"
          :alt="image.alt"
          :size="image.size"
          @loaded="onImageLoaded"
        />
      </div>
    </div>

    <div class="demo-section">
      <h3>Route-based Code Splitting</h3>
      <p>Each route loads its own chunk, reducing the initial bundle size</p>
      
      <div class="route-info">
        <div class="route-item">
          <span class="route-name">Home Route</span>
          <span class="chunk-size">~45KB</span>
        </div>
        <div class="route-item">
          <span class="route-name">Reactivity Route</span>
          <span class="chunk-size">~78KB</span>
        </div>
        <div class="route-item">
          <span class="route-name">Debounce Route</span>
          <span class="chunk-size">~65KB</span>
        </div>
        <div class="route-item">
          <span class="route-name">Re-render Route</span>
          <span class="chunk-size">~82KB</span>
        </div>
        <div class="route-item current-route">
          <span class="route-name">Lazy Loading Route</span>
          <span class="chunk-size">~71KB</span>
        </div>
      </div>
      
      <p class="route-explanation">
        Only the current route's code is loaded initially. Other routes are loaded when navigated to.
      </p>
    </div>

    <div class="demo-section">
      <h3>Progressive Loading Simulation</h3>
      <p>Simulate loading different types of content progressively</p>
      
      <div class="loading-controls">
        <button @click="startProgressiveLoading" :disabled="isProgressiveLoading" class="btn">
          {{ isProgressiveLoading ? 'Loading...' : 'Start Progressive Loading' }}
        </button>
        <button @click="resetProgressiveLoading" class="btn">Reset</button>
      </div>
      
      <div class="progressive-steps">
        <div 
          v-for="(step, index) in progressiveSteps" 
          :key="index"
          class="step-item"
          :class="{ 
            'step-loading': step.loading, 
            'step-completed': step.completed,
            'step-pending': !step.loading && !step.completed
          }"
        >
          <div class="step-indicator">
            <span v-if="step.completed">✓</span>
            <span v-else-if="step.loading" class="spinner-small"></span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-description">{{ step.description }}</div>
            <div v-if="step.loadTime" class="step-time">Loaded in {{ step.loadTime }}ms</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Lazy Loading Benefits</h3>
      <div class="benefits-grid">
        <div class="benefit-item">
          <h4>🚀 Faster Initial Load</h4>
          <p>Reduce initial bundle size by 60-90%</p>
        </div>
        <div class="benefit-item">
          <h4>📱 Better Mobile Experience</h4>
          <p>Less data usage and faster loading on slow connections</p>
        </div>
        <div class="benefit-item">
          <h4>⚡ Improved Performance</h4>
          <p>Load resources only when needed</p>
        </div>
        <div class="benefit-item">
          <h4>🎯 Better User Experience</h4>
          <p>Progressive content loading keeps users engaged</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Implementation Strategies</h3>
      <ul>
        <li><strong>Route-based splitting:</strong> Use dynamic imports in Vue Router</li>
        <li><strong>Component lazy loading:</strong> Use defineAsyncComponent</li>
        <li><strong>Image lazy loading:</strong> Use Intersection Observer API</li>
        <li><strong>Progressive enhancement:</strong> Load critical content first</li>
        <li><strong>Preloading:</strong> Load likely-needed resources in background</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineAsyncComponent } from 'vue'

// Heavy Components (simulated)
const HeavyChart = defineAsyncComponent(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        template: `
          <div class="heavy-component">
            <h4>📊 {{ title }}</h4>
            <div class="chart-placeholder">
              <div class="chart-bar" v-for="i in 5" :key="i" :style="{ height: Math.random() * 100 + 'px' }"></div>
            </div>
            <p>Heavy chart component loaded (simulated 800ms delay)</p>
          </div>
        `,
        props: ['title']
      })
    }, 800)
  })
)

const HeavyTable = defineAsyncComponent(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        template: `
          <div class="heavy-component">
            <h4>📋 {{ title }}</h4>
            <div class="table-placeholder">
              <div class="table-row" v-for="i in 10" :key="i">
                <span>Row {{ i }}</span>
                <span>Data {{ Math.floor(Math.random() * 1000) }}</span>
              </div>
            </div>
            <p>Heavy table component loaded (simulated 600ms delay)</p>
          </div>
        `,
        props: ['title']
      })
    }, 600)
  })
)

const HeavyMedia = defineAsyncComponent(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        template: `
          <div class="heavy-component">
            <h4>🎬 {{ title }}</h4>
            <div class="media-placeholder">
              <div class="video-placeholder">📹 Video Player</div>
              <div class="audio-placeholder">🎵 Audio Player</div>
            </div>
            <p>Heavy media component loaded (simulated 1200ms delay)</p>
          </div>
        `,
        props: ['title']
      })
    }, 1200)
  })
)

// Lazy Image Component
const LazyImage = {
  props: ['src', 'alt', 'size'],
  emits: ['loaded'],
  setup(props, { emit }) {
    const isLoaded = ref(false)
    const isIntersecting = ref(false)
    const imageRef = ref(null)
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isLoaded.value) {
          isIntersecting.value = true
          loadImage()
        }
      })
    })
    
    function loadImage() {
      setTimeout(() => {
        isLoaded.value = true
        emit('loaded', props.size)
      }, Math.random() * 500 + 200) // Simulate loading time
    }
    
    return {
      isLoaded,
      isIntersecting,
      imageRef,
      observer,
      onMounted() {
        if (imageRef.value) {
          observer.observe(imageRef.value)
        }
      },
      onUnmounted() {
        observer.disconnect()
      }
    }
  },
  template: `
    <div ref="imageRef" class="lazy-image-container" @vue:mounted="onMounted" @vue:unmounted="onUnmounted">
      <div v-if="!isLoaded" class="image-placeholder">
        <span v-if="isIntersecting">Loading...</span>
        <span v-else>📷 Image placeholder</span>
      </div>
      <div v-else class="loaded-image">
        <div class="fake-image">🖼️ {{ alt }}</div>
        <p>Loaded ({{ Math.round(size / 1024) }}KB)</p>
      </div>
    </div>
  `
}

export default {
  name: 'LazyLoadingDemo',
  components: {
    HeavyChart,
    HeavyTable,
    HeavyMedia,
    LazyImage
  },
  setup() {
    const availableComponents = ref([
      { name: 'Chart', component: null, loading: false, loadTime: 0 },
      { name: 'Table', component: null, loading: false, loadTime: 0 },
      { name: 'Media Player', component: null, loading: false, loadTime: 0 }
    ])
    
    const loadedComponents = ref([])
    const totalLoadTime = ref(0)
    
    // Image lazy loading
    const images = Array.from({ length: 20 }, (_, i) => ({
      src: `https://picsum.photos/300/200?random=${i}`,
      alt: `Image ${i + 1}`,
      size: Math.floor(Math.random() * 500 + 100) * 1024 // Random size in bytes
    }))
    
    const loadedImagesCount = ref(0)
    const totalImagesCount = ref(images.length)
    const savedBandwidth = ref(0)
    
    // Progressive loading
    const isProgressiveLoading = ref(false)
    const progressiveSteps = ref([
      { title: 'Critical CSS', description: 'Load essential styles', completed: false, loading: false, loadTime: null },
      { title: 'Core JavaScript', description: 'Load application framework', completed: false, loading: false, loadTime: null },
      { title: 'Main Content', description: 'Load primary page content', completed: false, loading: false, loadTime: null },
      { title: 'Secondary Content', description: 'Load additional sections', completed: false, loading: false, loadTime: null },
      { title: 'Analytics & Tracking', description: 'Load non-essential scripts', completed: false, loading: false, loadTime: null }
    ])
    
    const loadedComponentsCount = computed(() => loadedComponents.value.length)
    
    const savedLoadTime = computed(() => {
      // Estimate time saved by not loading all components at once
      const unloadedComponents = availableComponents.value.filter(c => !c.component)
      return unloadedComponents.length * 800 // Average load time
    })
    
    async function loadComponent(componentInfo) {
      if (componentInfo.loading || componentInfo.component) return
      
      componentInfo.loading = true
      const startTime = performance.now()
      
      try {
        let component
        switch (componentInfo.name) {
          case 'Chart':
            component = HeavyChart
            break
          case 'Table':
            component = HeavyTable
            break
          case 'Media Player':
            component = HeavyMedia
            break
        }
        
        // Wait for component to resolve
        await new Promise(resolve => {
          const loadTime = componentInfo.name === 'Chart' ? 800 : 
                          componentInfo.name === 'Table' ? 600 : 1200
          setTimeout(resolve, loadTime)
        })
        
        const endTime = performance.now()
        componentInfo.loadTime = Math.round(endTime - startTime)
        totalLoadTime.value += componentInfo.loadTime
        
        componentInfo.component = component
        loadedComponents.value.push({
          name: componentInfo.name,
          component: component
        })
      } finally {
        componentInfo.loading = false
      }
    }
    
    function onImageLoaded(size) {
      loadedImagesCount.value++
      const remainingImages = totalImagesCount.value - loadedImagesCount.value
      savedBandwidth.value = remainingImages * (size || 150000) // Estimate saved bandwidth
    }
    
    async function startProgressiveLoading() {
      isProgressiveLoading.value = true
      
      for (let i = 0; i < progressiveSteps.value.length; i++) {
        const step = progressiveSteps.value[i]
        step.loading = true
        
        const startTime = performance.now()
        const loadTime = Math.random() * 1000 + 500 // Random load time
        
        await new Promise(resolve => setTimeout(resolve, loadTime))
        
        step.loading = false
        step.completed = true
        step.loadTime = Math.round(performance.now() - startTime)
      }
      
      isProgressiveLoading.value = false
    }
    
    function resetProgressiveLoading() {
      progressiveSteps.value.forEach(step => {
        step.completed = false
        step.loading = false
        step.loadTime = null
      })
      isProgressiveLoading.value = false
    }
    
    // Calculate total saved bandwidth on mount
    savedBandwidth.value = images.reduce((total, img) => total + img.size, 0)
    
    return {
      availableComponents,
      loadedComponents,
      loadedComponentsCount,
      totalLoadTime,
      savedLoadTime,
      loadComponent,
      images,
      loadedImagesCount,
      totalImagesCount,
      savedBandwidth,
      onImageLoaded,
      isProgressiveLoading,
      progressiveSteps,
      startProgressiveLoading,
      resetProgressiveLoading
    }
  }
}
</script>

<style scoped>
.bundle-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1rem 0;
}

.bundle-info {
  text-align: center;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
}

.bundle-info h4 {
  margin-bottom: 1rem;
  color: #ffd700;
}

.bundle-stat {
  margin: 1rem 0;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #87ceeb;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
}

.savings-indicator {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(45deg, #4ade80, #22c55e);
  border-radius: 1rem;
  margin: 2rem 0;
}

.savings-amount {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
}

.savings-description {
  color: rgba(255, 255, 255, 0.9);
}

.component-controls {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.loaded-components {
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
}

.heavy-component {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.heavy-component h4 {
  margin-bottom: 1rem;
  color: #ffd700;
}

.chart-placeholder {
  display: flex;
  align-items: end;
  gap: 0.5rem;
  height: 100px;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
}

.chart-bar {
  width: 30px;
  background: linear-gradient(to top, #667eea, #764ba2);
  border-radius: 0.25rem;
  animation: growUp 1s ease-out;
}

@keyframes growUp {
  from { height: 0; }
}

.table-placeholder {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
}

.table-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.media-placeholder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
}

.video-placeholder, .audio-placeholder {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  border: 2px dashed rgba(255, 255, 255, 0.3);
}

.image-gallery {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
}

.scroll-instruction {
  text-align: center;
  padding: 1rem;
  color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.lazy-image-container {
  margin: 1rem 0;
  min-height: 100px;
}

.image-placeholder {
  background: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.loaded-image {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  animation: fadeIn 0.5s ease-in;
}

.fake-image {
  font-size: 2rem;
  padding: 1rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 0.5rem;
  color: white;
  margin-bottom: 0.5rem;
}

.route-info {
  display: grid;
  gap: 0.5rem;
  margin: 1rem 0;
}

.route-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
}

.route-item.current-route {
  background: rgba(255, 215, 0, 0.1);
  border-color: #ffd700;
}

.route-name {
  color: white;
  font-weight: bold;
}

.chunk-size {
  color: #87ceeb;
  font-family: monospace;
}

.route-explanation {
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  text-align: center;
  margin-top: 1rem;
}

.loading-controls {
  margin: 1rem 0;
  display: flex;
  gap: 0.5rem;
}

.progressive-steps {
  display: grid;
  gap: 1rem;
  margin: 2rem 0;
}

.step-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.step-pending {
  background: rgba(255, 255, 255, 0.05);
  opacity: 0.6;
}

.step-loading {
  background: rgba(255, 215, 0, 0.1);
  border-color: #ffd700;
}

.step-completed {
  background: rgba(74, 222, 128, 0.1);
  border-color: #4ade80;
}

.step-indicator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-weight: bold;
  font-size: 1.25rem;
}

.step-pending .step-indicator {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

.step-loading .step-indicator {
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
}

.step-completed .step-indicator {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: bold;
  color: white;
  margin-bottom: 0.25rem;
}

.step-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.step-time {
  color: #87ceeb;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-top: 2px solid #ffd700;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1rem 0;
}

.benefit-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
}

.benefit-item h4 {
  margin-bottom: 1rem;
  color: #ffd700;
}

.benefit-item p {
  color: rgba(255, 255, 255, 0.8);
}

.image-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}
</style>
