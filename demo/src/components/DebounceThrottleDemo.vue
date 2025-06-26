<template>
  <div class="debounce-throttle-demo">
    <div class="card">
      <h2>Debounce & Throttle Demo</h2>
      <p>
        Learn how debouncing and throttling can optimize performance by controlling 
        function execution frequency during user interactions.
      </p>
    </div>

    <div class="demo-section">
      <h3>Search Input Debouncing 
        <span class="performance-indicator performance-good">Optimized</span>
      </h3>
      <p>Debounce delays execution until after a pause in events</p>
      
      <div class="input-group">
        <label>Normal Input (triggers on every keystroke):</label>
        <input 
          v-model="normalSearch" 
          @input="handleNormalSearch"
          placeholder="Type to search..."
        />
      </div>
      
      <div class="input-group">
        <label>Debounced Input (300ms delay):</label>
        <input 
          v-model="debouncedSearch" 
          @input="handleDebouncedSearch"
          placeholder="Type to search..."
        />
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ normalSearchCount }}</div>
          <div class="stat-label">Normal API Calls</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ debouncedSearchCount }}</div>
          <div class="stat-label">Debounced API Calls</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ Math.round(((normalSearchCount - debouncedSearchCount) / Math.max(normalSearchCount, 1)) * 100) }}%</div>
          <div class="stat-label">Calls Saved</div>
        </div>
      </div>
      
      <div class="search-results">
        <h4>Search Results:</h4>
        <p v-if="isSearching" class="loading-text">🔍 Searching...</p>
        <div v-else-if="searchResults.length > 0" class="results-grid">
          <div v-for="result in searchResults.slice(0, 6)" :key="result.id" class="result-item">
            <strong>{{ result.name }}</strong>
            <p>{{ result.description }}</p>
          </div>
        </div>
        <p v-else class="no-results">No results found</p>
      </div>
    </div>

    <div class="demo-section">
      <h3>Scroll Event Throttling 
        <span class="performance-indicator performance-good">Optimized</span>
      </h3>
      <p>Throttling limits execution to at most once per time period</p>
      
      <div class="scroll-container" @scroll="handleScroll" ref="scrollContainer">
        <div class="scroll-content">
          <div v-for="i in 50" :key="i" class="scroll-item">
            Item {{ i }} - Scroll to see throttling in action
          </div>
        </div>
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ normalScrollCount }}</div>
          <div class="stat-label">Normal Scroll Events</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ throttledScrollCount }}</div>
          <div class="stat-label">Throttled Events (100ms)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ scrollPosition }}px</div>
          <div class="stat-label">Current Scroll Position</div>
        </div>
      </div>
      
      <button @click="resetScrollStats" class="btn">Reset Stats</button>
    </div>

    <div class="demo-section">
      <h3>Window Resize Throttling</h3>
      <p>Throttle window resize events to prevent excessive calculations</p>
      
      <div class="resize-demo">
        <div class="resize-indicator" :style="{ width: windowWidth + 'px', height: '20px' }"></div>
        <p>Window Width: {{ windowWidth }}px (resize window to see effect)</p>
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ normalResizeCount }}</div>
          <div class="stat-label">Normal Resize Events</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ throttledResizeCount }}</div>
          <div class="stat-label">Throttled Events (250ms)</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Performance Impact Visualization</h3>
      <div class="performance-chart">
        <div class="chart-bar">
          <div class="bar-label">Normal Events</div>
          <div class="bar normal-bar" :style="{ width: normalEventsPercent + '%' }">
            {{ totalNormalEvents }}
          </div>
        </div>
        <div class="chart-bar">
          <div class="bar-label">Optimized Events</div>
          <div class="bar optimized-bar" :style="{ width: optimizedEventsPercent + '%' }">
            {{ totalOptimizedEvents }}
          </div>
        </div>
      </div>
      <p><strong>Performance Improvement:</strong> {{ performanceImprovement }}% fewer function calls</p>
    </div>

    <div class="card">
      <h3>Key Takeaways</h3>
      <ul>
        <li><strong>Debounce:</strong> Use for search inputs, form validation - waits for pause in events</li>
        <li><strong>Throttle:</strong> Use for scroll, resize, mouse move - limits execution frequency</li>
        <li><strong>API Optimization:</strong> Debouncing can reduce API calls by 80-90%</li>
        <li><strong>Event Optimization:</strong> Throttling prevents UI lag during high-frequency events</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { debounce, throttle } from 'lodash-es'

export default {
  name: 'DebounceThrottleDemo',
  setup() {
    // Search demo
    const normalSearch = ref('')
    const debouncedSearch = ref('')
    const normalSearchCount = ref(0)
    const debouncedSearchCount = ref(0)
    const searchResults = ref([])
    const isSearching = ref(false)
    
    // Scroll demo
    const scrollContainer = ref(null)
    const normalScrollCount = ref(0)
    const throttledScrollCount = ref(0)
    const scrollPosition = ref(0)
    
    // Resize demo
    const windowWidth = ref(window.innerWidth)
    const normalResizeCount = ref(0)
    const throttledResizeCount = ref(0)
    
    // Mock data for search
    const mockData = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      description: `This is a description for product ${i + 1}`
    }))
    
    function performSearch(query) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!query.trim()) {
            resolve([])
            return
          }
          
          const results = mockData.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
          )
          resolve(results)
        }, 200) // Simulate API delay
      })
    }
    
    function handleNormalSearch() {
      normalSearchCount.value++
      simulateAPICall(normalSearch.value)
    }
    
    const handleDebouncedSearch = debounce(() => {
      debouncedSearchCount.value++
      simulateAPICall(debouncedSearch.value)
    }, 300)
    
    async function simulateAPICall(query) {
      isSearching.value = true
      searchResults.value = await performSearch(query)
      isSearching.value = false
    }
    
    function handleScroll(event) {
      normalScrollCount.value++
      handleThrottledScroll(event)
    }
    
    const handleThrottledScroll = throttle((event) => {
      throttledScrollCount.value++
      scrollPosition.value = Math.round(event.target.scrollTop)
    }, 100)
    
    function handleResize() {
      normalResizeCount.value++
      handleThrottledResize()
    }
    
    const handleThrottledResize = throttle(() => {
      throttledResizeCount.value++
      windowWidth.value = window.innerWidth
    }, 250)
    
    function resetScrollStats() {
      normalScrollCount.value = 0
      throttledScrollCount.value = 0
      scrollPosition.value = 0
    }
    
    // Computed properties for performance metrics
    const totalNormalEvents = computed(() => 
      normalSearchCount.value + normalScrollCount.value + normalResizeCount.value
    )
    
    const totalOptimizedEvents = computed(() => 
      debouncedSearchCount.value + throttledScrollCount.value + throttledResizeCount.value
    )
    
    const normalEventsPercent = computed(() => 
      totalNormalEvents.value > 0 ? 100 : 0
    )
    
    const optimizedEventsPercent = computed(() => 
      totalNormalEvents.value > 0 ? (totalOptimizedEvents.value / totalNormalEvents.value) * 100 : 0
    )
    
    const performanceImprovement = computed(() => 
      totalNormalEvents.value > 0 
        ? Math.round(((totalNormalEvents.value - totalOptimizedEvents.value) / totalNormalEvents.value) * 100)
        : 0
    )
    
    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })
    
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
    
    return {
      normalSearch,
      debouncedSearch,
      normalSearchCount,
      debouncedSearchCount,
      searchResults,
      isSearching,
      handleNormalSearch,
      handleDebouncedSearch,
      scrollContainer,
      normalScrollCount,
      throttledScrollCount,
      scrollPosition,
      handleScroll,
      resetScrollStats,
      windowWidth,
      normalResizeCount,
      throttledResizeCount,
      totalNormalEvents,
      totalOptimizedEvents,
      normalEventsPercent,
      optimizedEventsPercent,
      performanceImprovement
    }
  }
}
</script>

<style scoped>
.scroll-container {
  height: 200px;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  margin: 1rem 0;
  background: rgba(0, 0, 0, 0.2);
}

.scroll-content {
  padding: 1rem;
}

.scroll-item {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.search-results {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
}

.search-results h4 {
  margin-bottom: 1rem;
  color: #ffd700;
}

.loading-text {
  color: #87ceeb;
  font-style: italic;
}

.no-results {
  color: rgba(255, 255, 255, 0.7);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.result-item {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.result-item strong {
  color: #ffd700;
  display: block;
  margin-bottom: 0.5rem;
}

.result-item p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
}

.resize-demo {
  margin: 1rem 0;
}

.resize-indicator {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: width 0.3s ease;
}

.performance-chart {
  margin: 1rem 0;
}

.chart-bar {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.bar-label {
  width: 150px;
  color: white;
  font-weight: bold;
}

.bar {
  height: 40px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  min-width: 60px;
  transition: width 0.5s ease;
}

.normal-bar {
  background: linear-gradient(45deg, #f87171, #ef4444);
}

.optimized-bar {
  background: linear-gradient(45deg, #4ade80, #22c55e);
}
</style>
