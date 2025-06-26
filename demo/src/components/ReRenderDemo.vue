<template>
  <div class="re-render-demo">
    <div class="card">
      <h2>Reduce Component Re-render Demo</h2>
      <p>
        Learn how to minimize unnecessary component re-renders using Vue's optimization directives 
        and rendering strategies.
      </p>
    </div>

    <div class="demo-section">
      <h3>v-once Directive 
        <span class="performance-indicator performance-good">Optimized</span>
      </h3>
      <p>Renders element/component only once - subsequent data changes won't trigger re-render</p>
      
      <div class="render-comparison">
        <div class="render-demo">
          <h4>Normal Rendering (re-renders on every update)</h4>
          <div class="render-count">Render count: {{ normalRenderCount }}</div>
          <div class="expensive-component">
            <p>Current time: {{ currentTime }}</p>
            <p>Random number: {{ randomNumber }}</p>
            <div class="expensive-calculation">
              Expensive calculation result: {{ expensiveCalculation }}
            </div>
          </div>
        </div>
        
        <div class="render-demo">
          <h4>v-once Rendering (renders only once)</h4>
          <div class="render-count">Render count: 1 (static)</div>
          <div v-once class="expensive-component">
            <p>Current time: {{ currentTime }}</p>
            <p>Random number: {{ randomNumber }}</p>
            <div class="expensive-calculation">
              Expensive calculation result: {{ expensiveCalculation }}
            </div>
          </div>
        </div>
      </div>
      
      <button @click="updateData" class="btn">Update Data (Trigger Re-render)</button>
    </div>

    <div class="demo-section">
      <h3>v-memo Directive 
        <span class="performance-indicator performance-good">Smart Caching</span>
      </h3>
      <p>Memoizes rendering - only re-renders when dependencies change</p>
      
      <div class="input-group">
        <label>Memo dependency (triggers re-render when changed):</label>
        <input v-model="memoKey" placeholder="Change this to trigger memo re-render" />
      </div>
      
      <div class="input-group">
        <label>Non-memo dependency (doesn't trigger memo re-render):</label>
        <input v-model="nonMemoKey" placeholder="Change this - memo won't re-render" />
      </div>
      
      <div class="render-comparison">
        <div class="render-demo">
          <h4>Normal Rendering</h4>
          <div class="render-count">Render count: {{ normalMemoRenderCount }}</div>
          <div class="memo-content">
            <p>Memo key: {{ memoKey }}</p>
            <p>Non-memo key: {{ nonMemoKey }}</p>
            <p>Expensive operation: {{ expensiveMemoCalculation }}</p>
          </div>
        </div>
        
        <div class="render-demo">
          <h4>v-memo Rendering</h4>
          <div class="render-count">Render count: {{ memoRenderCount }}</div>
          <div v-memo="[memoKey]" class="memo-content">
            <p>Memo key: {{ memoKey }}</p>
            <p>Non-memo key: {{ nonMemoKey }}</p>
            <p>Expensive operation: {{ expensiveMemoCalculation }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>v-show vs v-if Performance</h3>
      <p>v-show toggles CSS visibility, v-if adds/removes from DOM</p>
      
      <div class="toggle-controls">
        <button @click="toggleShow" class="btn">
          Toggle v-show Element ({{ showElement ? 'Hide' : 'Show' }})
        </button>
        <button @click="toggleIf" class="btn">
          Toggle v-if Element ({{ ifElement ? 'Hide' : 'Show' }})
        </button>
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ vShowToggleCount }}</div>
          <div class="stat-label">v-show Toggles</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ vIfToggleCount }}</div>
          <div class="stat-label">v-if Toggles</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ vShowRenderTime }}ms</div>
          <div class="stat-label">v-show Avg Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ vIfRenderTime }}ms</div>
          <div class="stat-label">v-if Avg Time</div>
        </div>
      </div>
      
      <div class="visibility-demo">
        <div class="demo-container">
          <h4>v-show (CSS visibility toggle)</h4>
          <div v-show="showElement" class="conditional-content">
            <ExpensiveComponent :data="expensiveData" />
          </div>
          <p v-if="!showElement" class="hidden-message">Element is hidden with v-show (still in DOM)</p>
        </div>
        
        <div class="demo-container">
          <h4>v-if (DOM add/remove)</h4>
          <div v-if="ifElement" class="conditional-content">
            <ExpensiveComponent :data="expensiveData" />
          </div>
          <p v-if="!ifElement" class="hidden-message">Element is removed with v-if (not in DOM)</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>Key Attribute for List Rendering</h3>
      <p>Proper key usage helps Vue efficiently update lists</p>
      
      <div class="list-controls">
        <button @click="shuffleWithoutKey" class="btn">Shuffle List (No Keys)</button>
        <button @click="shuffleWithKey" class="btn">Shuffle List (With Keys)</button>
        <button @click="addItem" class="btn">Add Item</button>
        <button @click="removeItem" class="btn">Remove Random Item</button>
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ noKeyOperations }}</div>
          <div class="stat-label">No-Key Operations</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ withKeyOperations }}</div>
          <div class="stat-label">With-Key Operations</div>
        </div>
      </div>
      
      <div class="list-comparison">
        <div class="list-demo">
          <h4>Without Keys (inefficient updates)</h4>
          <div class="list-container">
            <ListItem 
              v-for="(item, index) in listWithoutKey" 
              :item="item"
              :index="index"
            />
          </div>
        </div>
        
        <div class="list-demo">
          <h4>With Keys (efficient updates)</h4>
          <div class="list-container">
            <ListItem 
              v-for="(item, index) in listWithKey" 
              :key="item.id"
              :item="item"
              :index="index"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Performance Summary</h3>
      <div class="performance-summary">
        <div class="summary-item">
          <strong>v-once:</strong> 
          <span class="performance-good">Eliminated {{ normalRenderCount - 1 }} re-renders</span>
        </div>
        <div class="summary-item">
          <strong>v-memo:</strong> 
          <span class="performance-good">Saved {{ normalMemoRenderCount - memoRenderCount }} renders</span>
        </div>
        <div class="summary-item">
          <strong>v-show vs v-if:</strong> 
          <span :class="vShowRenderTime < vIfRenderTime ? 'performance-good' : 'performance-bad'">
            v-show is {{ Math.abs(vIfRenderTime - vShowRenderTime) }}ms faster
          </span>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Key Takeaways</h3>
      <ul>
        <li><strong>v-once:</strong> Use for static content that never changes after initial render</li>
        <li><strong>v-memo:</strong> Use for expensive computations with specific dependencies</li>
        <li><strong>v-show:</strong> Better for frequent toggling (keeps element in DOM)</li>
        <li><strong>v-if:</strong> Better for conditional rendering (removes from DOM)</li>
        <li><strong>Key attribute:</strong> Essential for efficient list updates and component reuse</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

// Expensive Component
const ExpensiveComponent = {
  props: ['data'],
  setup(props) {
    const renderCount = ref(0)
    
    // Simulate expensive operation
    const processedData = computed(() => {
      renderCount.value++
      // Simulate heavy computation
      let result = 0
      for (let i = 0; i < 100000; i++) {
        result += Math.random()
      }
      return {
        ...props.data,
        processed: result.toFixed(2),
        renderCount: renderCount.value
      }
    })
    
    return { processedData }
  },
  template: `
    <div class="expensive-component">
      <p>Render count: {{ processedData.renderCount }}</p>
      <p>Data: {{ processedData.name }}</p>
      <p>Processed result: {{ processedData.processed }}</p>
    </div>
  `
}

// List Item Component
const ListItem = {
  props: ['item', 'index'],
  setup() {
    const renderCount = ref(0)
    renderCount.value++
    
    return { renderCount }
  },
  template: `
    <div class="list-item">
      <span class="item-content">{{ item.name }}</span>
      <span class="item-id">ID: {{ item.id }}</span>
      <span class="render-indicator">Renders: {{ renderCount }}</span>
    </div>
  `
}

export default {
  name: 'ReRenderDemo',
  components: {
    ExpensiveComponent,
    ListItem
  },
  setup() {
    // v-once demo
    const currentTime = ref(new Date().toLocaleTimeString())
    const randomNumber = ref(Math.random())
    const normalRenderCount = ref(1)
    
    // v-memo demo
    const memoKey = ref('initial-value')
    const nonMemoKey = ref('non-memo-value')
    const memoRenderCount = ref(1)
    const normalMemoRenderCount = ref(1)
    
    // v-show vs v-if demo
    const showElement = ref(true)
    const ifElement = ref(true)
    const vShowToggleCount = ref(0)
    const vIfToggleCount = ref(0)
    const vShowTimes = ref([])
    const vIfTimes = ref([])
    const expensiveData = ref({ name: 'Expensive Component Data' })
    
    // List demo
    const listWithoutKey = ref(generateList())
    const listWithKey = ref(generateList())
    const noKeyOperations = ref(0)
    const withKeyOperations = ref(0)
    
    function generateList() {
      return Array.from({ length: 5 }, (_, i) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: `Item ${i + 1}`
      }))
    }
    
    // Computed properties
    const expensiveCalculation = computed(() => {
      // Simulate expensive calculation
      let result = 0
      for (let i = 0; i < 50000; i++) {
        result += Math.random()
      }
      return result.toFixed(2)
    })
    
    const expensiveMemoCalculation = computed(() => {
      // Another expensive calculation
      let result = 0
      for (let i = 0; i < 30000; i++) {
        result += Math.sin(i) * Math.cos(i)
      }
      return result.toFixed(4)
    })
    
    const vShowRenderTime = computed(() => {
      return vShowTimes.value.length > 0 
        ? Math.round(vShowTimes.value.reduce((a, b) => a + b, 0) / vShowTimes.value.length)
        : 0
    })
    
    const vIfRenderTime = computed(() => {
      return vIfTimes.value.length > 0 
        ? Math.round(vIfTimes.value.reduce((a, b) => a + b, 0) / vIfTimes.value.length)
        : 0
    })
    
    // Watch for memo render counting
    watch(memoKey, () => {
      memoRenderCount.value++
    })
    
    watch([memoKey, nonMemoKey], () => {
      normalMemoRenderCount.value++
    })
    
    function updateData() {
      normalRenderCount.value++
      currentTime.value = new Date().toLocaleTimeString()
      randomNumber.value = Math.random()
    }
    
    function toggleShow() {
      const start = performance.now()
      showElement.value = !showElement.value
      vShowToggleCount.value++
      const end = performance.now()
      vShowTimes.value.push(end - start)
      if (vShowTimes.value.length > 10) vShowTimes.value.shift()
    }
    
    function toggleIf() {
      const start = performance.now()
      ifElement.value = !ifElement.value
      vIfToggleCount.value++
      const end = performance.now()
      vIfTimes.value.push(end - start)
      if (vIfTimes.value.length > 10) vIfTimes.value.shift()
    }
    
    function shuffleArray(array) {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }
    
    function shuffleWithoutKey() {
      listWithoutKey.value = shuffleArray(listWithoutKey.value)
      noKeyOperations.value++
    }
    
    function shuffleWithKey() {
      listWithKey.value = shuffleArray(listWithKey.value)
      withKeyOperations.value++
    }
    
    function addItem() {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Item ${Date.now()}`
      }
      listWithoutKey.value.push(newItem)
      listWithKey.value.push(newItem)
      noKeyOperations.value++
      withKeyOperations.value++
    }
    
    function removeItem() {
      if (listWithoutKey.value.length > 1) {
        const randomIndex = Math.floor(Math.random() * listWithoutKey.value.length)
        listWithoutKey.value.splice(randomIndex, 1)
        listWithKey.value.splice(randomIndex, 1)
        noKeyOperations.value++
        withKeyOperations.value++
      }
    }
    
    return {
      currentTime,
      randomNumber,
      normalRenderCount,
      expensiveCalculation,
      updateData,
      memoKey,
      nonMemoKey,
      memoRenderCount,
      normalMemoRenderCount,
      expensiveMemoCalculation,
      showElement,
      ifElement,
      vShowToggleCount,
      vIfToggleCount,
      vShowRenderTime,
      vIfRenderTime,
      expensiveData,
      toggleShow,
      toggleIf,
      listWithoutKey,
      listWithKey,
      noKeyOperations,
      withKeyOperations,
      shuffleWithoutKey,
      shuffleWithKey,
      addItem,
      removeItem
    }
  }
}
</script>

<style scoped>
.render-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1rem 0;
}

.render-demo {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
}

.render-demo h4 {
  margin-bottom: 1rem;
  color: #ffd700;
}

.render-count {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #87ceeb;
}

.expensive-component {
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.expensive-calculation {
  color: #ffd700;
  font-weight: bold;
  margin-top: 0.5rem;
}

.memo-content {
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.toggle-controls {
  margin: 1rem 0;
}

.visibility-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1rem 0;
}

.demo-container {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
}

.demo-container h4 {
  margin-bottom: 1rem;
  color: #ffd700;
}

.conditional-content {
  min-height: 100px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
}

.hidden-message {
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  text-align: center;
  padding: 2rem;
}

.list-controls {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.list-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1rem 0;
}

.list-demo {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
}

.list-demo h4 {
  margin-bottom: 1rem;
  color: #ffd700;
}

.list-container {
  min-height: 200px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.list-item:hover {
  background: rgba(255, 255, 255, 0.15);
}

.item-content {
  font-weight: bold;
  color: white;
}

.item-id {
  color: #87ceeb;
  font-size: 0.875rem;
}

.render-indicator {
  color: #ffd700;
  font-size: 0.75rem;
  background: rgba(255, 215, 0, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.performance-summary {
  display: grid;
  gap: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.performance-good {
  color: #4ade80;
}

.performance-bad {
  color: #f87171;
}
</style>
