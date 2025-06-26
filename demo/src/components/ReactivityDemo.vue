<template>
  <div class="reactivity-demo">
    <div class="card">
      <h2>Reactivity Optimization Demo</h2>
      <p>
        This demo compares deep reactivity vs shallow reactivity performance. 
        Deep reactivity tracks all nested properties, while shallow reactivity only tracks top-level changes.
      </p>
    </div>

    <div class="demo-section">
      <h3>Deep Reactivity (Default Behavior) 
        <span class="performance-indicator performance-bad">Heavy</span>
      </h3>
      <p>Using reactive() - tracks all nested properties</p>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ deepUpdateCount }}</div>
          <div class="stat-label">Updates Triggered</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ deepRenderTime }}ms</div>
          <div class="stat-label">Render Time</div>
        </div>
      </div>
      
      <button @click="updateDeepData" class="btn">Update Deep Data ({{ deepData.users.length }} users)</button>
      
      <div class="data-preview">
        <h4>Current Data (First 3 users):</h4>
        <pre>{{ JSON.stringify(deepData.users.slice(0, 3), null, 2) }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h3>Shallow Reactivity 
        <span class="performance-indicator performance-good">Light</span>
      </h3>
      <p>Using shallowReactive() - only tracks top-level properties</p>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ shallowUpdateCount }}</div>
          <div class="stat-label">Updates Triggered</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ shallowRenderTime }}ms</div>
          <div class="stat-label">Render Time</div>
        </div>
      </div>
      
      <button @click="updateShallowData" class="btn">Update Shallow Data ({{ shallowData.users.length }} users)</button>
      
      <div class="data-preview">
        <h4>Current Data (First 3 users):</h4>
        <pre>{{ JSON.stringify(shallowData.users.slice(0, 3), null, 2) }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h3>Computed vs Watch Comparison</h3>
      
      <div class="input-group">
        <label>Enter numbers (comma separated):</label>
        <input 
          v-model="numbersInput" 
          placeholder="1,2,3,4,5"
          type="text"
        />
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">{{ computedSum }}</div>
          <div class="stat-label">Computed Sum</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ watchSum }}</div>
          <div class="stat-label">Watch Sum</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ computedCallCount }}</div>
          <div class="stat-label">Computed Calls</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ watchCallCount }}</div>
          <div class="stat-label">Watch Calls</div>
        </div>
      </div>
      
      <p><strong>Notice:</strong> Computed is cached and only recalculates when dependencies change, while watch runs on every change.</p>
    </div>

    <div class="card">
      <h3>Key Takeaways</h3>
      <ul>
        <li><strong>Use shallowReactive/shallowRef</strong> for large immutable data structures like charts, configurations</li>
        <li><strong>Computed properties</strong> are cached and more efficient than watchers for derived values</li>
        <li><strong>Deep reactivity</strong> has overhead - avoid it for large datasets that don't need nested tracking</li>
        <li><strong>Manual triggering</strong> might be needed with shallow reactivity when nested data changes</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, shallowReactive, ref, computed, watch } from 'vue'

export default {
  name: 'ReactivityDemo',
  setup() {
    // Deep reactivity demo
    const deepData = reactive({
      users: generateUsers(1000),
      config: { theme: 'dark', language: 'en' }
    })
    
    // Shallow reactivity demo
    const shallowData = shallowReactive({
      users: generateUsers(1000),
      config: { theme: 'dark', language: 'en' }
    })
    
    const deepUpdateCount = ref(0)
    const shallowUpdateCount = ref(0)
    const deepRenderTime = ref(0)
    const shallowRenderTime = ref(0)
    
    // Computed vs Watch demo
    const numbersInput = ref('1,2,3,4,5')
    const watchSum = ref(0)
    const computedCallCount = ref(0)
    const watchCallCount = ref(0)
    
    const computedSum = computed(() => {
      computedCallCount.value++
      const numbers = numbersInput.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
      return numbers.reduce((sum, num) => sum + num, 0)
    })
    
    watch(numbersInput, (newValue) => {
      watchCallCount.value++
      const numbers = newValue.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
      watchSum.value = numbers.reduce((sum, num) => sum + num, 0)
    }, { immediate: true })
    
    function generateUsers(count) {
      return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        age: Math.floor(Math.random() * 50) + 18,
        score: Math.floor(Math.random() * 100)
      }))
    }
    
    function updateDeepData() {
      const start = performance.now()
      deepUpdateCount.value++
      
      // Simulate updating nested data
      deepData.users.forEach(user => {
        user.score = Math.floor(Math.random() * 100)
      })
      
      // Add new users
      const newUsers = generateUsers(10)
      deepData.users.push(...newUsers)
      
      deepRenderTime.value = Math.round(performance.now() - start)
    }
    
    function updateShallowData() {
      const start = performance.now()
      shallowUpdateCount.value++
      
      // With shallow reactivity, we need to replace the entire array
      // to trigger reactivity (since it doesn't track nested changes)
      const updatedUsers = shallowData.users.map(user => ({
        ...user,
        score: Math.floor(Math.random() * 100)
      }))
      
      // Add new users
      const newUsers = generateUsers(10)
      shallowData.users = [...updatedUsers, ...newUsers]
      
      shallowRenderTime.value = Math.round(performance.now() - start)
    }
    
    return {
      deepData,
      shallowData,
      deepUpdateCount,
      shallowUpdateCount,
      deepRenderTime,
      shallowRenderTime,
      updateDeepData,
      updateShallowData,
      numbersInput,
      computedSum,
      watchSum,
      computedCallCount,
      watchCallCount
    }
  }
}
</script>

<style scoped>
.data-preview {
  margin-top: 1rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
}

.data-preview h4 {
  margin-bottom: 0.5rem;
  color: #ffd700;
}

.data-preview pre {
  font-size: 0.875rem;
  color: #e2e8f0;
  white-space: pre-wrap;
}
</style>
