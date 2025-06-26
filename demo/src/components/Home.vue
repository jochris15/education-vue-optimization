<script>
export default {
  name: "Home",
};
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1>Vue.js Optimization Techniques</h1>
      <p>Interactive demos showcasing performance optimization strategies</p>
    </div>

    <div class="features-grid">
      <div class="feature-card" @click="$router.push('/reactivity')">
        <h3>🔄 Reactivity Optimization</h3>
        <p>
          Learn about shallow vs deep reactivity and when to use each approach for better
          performance.
        </p>
        <ul>
          <li>Deep vs Shallow Reactivity</li>
          <li>shallowRef & shallowReactive</li>
          <li>Performance comparisons</li>
        </ul>
      </div>

      <div class="feature-card" @click="$router.push('/debounce-throttle')">
        <h3>⏱️ Debounce & Throttle</h3>
        <p>
          Control function execution frequency to optimize user interactions and API
          calls.
        </p>
        <ul>
          <li>Input debouncing</li>
          <li>Scroll throttling</li>
          <li>Real-time performance metrics</li>
        </ul>
      </div>

      <div class="feature-card" @click="$router.push('/re-render')">
        <h3>🎯 Reduce Re-renders</h3>
        <p>
          Minimize unnecessary component re-renders using Vue's optimization directives.
        </p>
        <ul>
          <li>v-once directive</li>
          <li>v-memo optimization</li>
          <li>v-show vs v-if</li>
        </ul>
      </div>

      <div class="feature-card" @click="$router.push('/lazy-loading')">
        <h3>⚡ Lazy Loading</h3>
        <p>
          Load components and resources only when needed to improve initial load time.
        </p>
        <ul>
          <li>Dynamic imports</li>
          <li>Route-based code splitting</li>
          <li>Component lazy loading</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h2>About This Demo</h2>
      <p>
        This application demonstrates various Vue.js optimization techniques mentioned in
        the README. Each section includes interactive examples with performance
        measurements to help you understand the impact of different optimization
        strategies.
      </p>

      <h3>Key Optimization Areas:</h3>
      <ul>
        <li><strong>Over-reactivity:</strong> Avoiding unnecessary reactive tracking</li>
        <li><strong>Component re-render:</strong> Minimizing unnecessary DOM updates</li>
        <li><strong>Large bundle size:</strong> Code splitting and lazy loading</li>
        <li><strong>Heavy DOM operations:</strong> Efficient rendering strategies</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.home {
  color: white;
}

.hero {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffd700, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: 1.25rem;
  opacity: 0.9;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffd700;
}

.feature-card p {
  margin-bottom: 1rem;
  opacity: 0.9;
}

.feature-card ul {
  list-style: none;
  padding: 0;
}

.feature-card li {
  padding: 0.25rem 0;
  opacity: 0.8;
}

.feature-card li::before {
  content: "✓ ";
  color: #4ade80;
  font-weight: bold;
}

.card ul {
  padding-left: 1.5rem;
}

.card li {
  margin: 0.5rem 0;
}
</style>
