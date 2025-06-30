<script setup>
import { ref, onMounted, onUpdated } from "vue";

// Set component name for multi-word requirement
defineOptions({
  name: "HomeView",
});

// Performance tracking
const renderCount = ref(0);

const challenges = [
  {
    title: "🔄 Over-reactivity",
    description: "Too much unnecessary reactivity tracking",
  },
  {
    title: "🎨 Component re-render",
    description: "Components re-rendering without purpose",
  },
  {
    title: "📦 Large bundle size",
    description: "Big bundles due to too many dependencies",
  },
  {
    title: "🐌 Heavy DOM Operation",
    description: "Inefficient DOM manipulation slowing UI",
  },
];

const demos = [
  {
    path: "/reactivity",
    title: "REACTIVITY",
    description: "Learn about shallow vs deep reactivity",
    icon: "⚡",
    bgColor: "bg-neo-pink",
    techniques: ["shallowRef", "shallowReactive", "computed"],
  },
  {
    path: "/debounce-throttle",
    title: "DEBOUNCE & THROTTLE",
    description: "Control function execution frequency",
    icon: "⏱️",
    bgColor: "bg-neo-blue",
    techniques: ["debounce", "throttle", "event optimization"],
  },
  {
    path: "/re-render",
    title: "RE-RENDER CONTROL",
    description: "Optimize component rendering",
    icon: "🎯",
    bgColor: "bg-neo-yellow",
    techniques: ["v-memo", "v-once", "v-show", "key"],
  },
  {
    path: "/lazy-loading",
    title: "LAZY LOADING",
    description: "Load components when needed",
    icon: "🚀",
    bgColor: "bg-neo-green",
    techniques: ["defineAsyncComponent", "dynamic imports"],
  },
];

onMounted(() => {
  renderCount.value++;
});

onUpdated(() => {
  renderCount.value++;
});
</script>

<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <section class="text-center py-12">
      <h1 class="neo-title inline-block text-6xl mb-6">VUE OPTIMIZATION</h1>
      <p class="text-2xl font-bold text-neo-black max-w-4xl mx-auto">
        Learn Vue.js performance optimization techniques with interactive demos!
      </p>
    </section>

    <!-- Why Optimization Section -->
    <section class="neo-section">
      <h2 class="text-3xl font-bold mb-6 text-neo-yellow">🤔 WHY NEED OPTIMIZATION?</h2>
      <p class="text-xl mb-6">
        Vue.js is designed to be lightweight and fast, but complex applications without
        proper optimization can suffer from performance issues.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="challenge in challenges"
          :key="challenge.title"
          class="neo-card bg-neo-yellow"
        >
          <h3 class="text-xl font-bold text-neo-black mb-2">{{ challenge.title }}</h3>
          <p class="text-neo-black">{{ challenge.description }}</p>
        </div>
      </div>
    </section>

    <!-- Demo Cards -->
    <section>
      <h2 class="text-3xl font-bold text-center mb-8 text-neo-black">
        🛠️ INTERACTIVE DEMOS
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          v-for="demo in demos"
          :key="demo.path"
          :to="demo.path"
          class="neo-card hover:shadow-neo-xl transition-all duration-200 hover:-translate-y-1 block"
          :class="demo.bgColor"
        >
          <div class="text-4xl mb-4">{{ demo.icon }}</div>
          <h3 class="text-2xl font-bold mb-3 text-neo-black">{{ demo.title }}</h3>
          <p class="text-neo-black mb-4">{{ demo.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="technique in demo.techniques"
              :key="technique"
              class="bg-neo-black text-neo-white px-2 py-1 text-xs font-bold border-2 border-neo-black"
            >
              {{ technique }}
            </span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Performance Counter -->
    <section class="neo-section bg-neo-green">
      <h2 class="text-3xl font-bold mb-6 text-neo-black">📊 REAL-TIME PERFORMANCE</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="neo-card bg-neo-white text-center">
          <div class="text-3xl font-bold text-neo-pink">{{ renderCount }}</div>
          <div class="text-sm text-neo-black">Component Renders</div>
        </div>
        <div class="neo-card bg-neo-white text-center">
          <div class="text-3xl font-bold text-neo-blue">{{ Date.now() % 10000 }}</div>
          <div class="text-sm text-neo-black">Current Timestamp</div>
        </div>
        <div class="neo-card bg-neo-white text-center">
          <div class="text-3xl font-bold text-neo-purple">
            {{ Math.floor(Math.random() * 100) }}%
          </div>
          <div class="text-sm text-neo-black">Optimization Score</div>
        </div>
      </div>
    </section>
  </div>
</template>
