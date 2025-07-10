<script setup>
import { ref, defineAsyncComponent } from "vue";

// component loading state
const currentComponent = ref("");
const currentComponentInstance = ref(null);

const availableComponents = [
  { name: "chart", label: "Chart", color: "bg-neo-pink" },
];

const loadComponent = async (componentName) => {
  try {
    // dynamic import based on component name
    const component = defineAsyncComponent(() =>
      import("../components/ChartComponent.vue")
    );

    currentComponentInstance.value = component;
    currentComponent.value = componentName;
  } catch (error) {
    console.error("Error loading component:", error);
  } 
};
</script>

<template>
  <div class="space-y-8">
    <section class="text-center">
      <h1 class="neo-title inline-block mb-4">🚀 LAZY LOADING</h1>
      <p class="text-xl text-neo-black max-w-3xl mx-auto">
        Load components and resources only when needed to improve initial load time!
      </p>
    </section>

    <!-- theory -->
    <section class="neo-section bg-neo-green">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">📚 LAZY LOADING TECHNIQUE</h2>

      <div class="neo-card bg-neo-white mb-4">
        <h3 class="text-xl font-bold text-neo-black mb-4">🧩 Component Lazy Loading</h3>
        <p class="text-neo-black mb-4">
          Use defineAsyncComponent to load components on demand.
        </p>
        <div class="bg-neo-purple text-neo-black p-3 border-2 border-neo-black">
          <code class="text-sm">defineAsyncComponent(() => import('./ComponentName.vue'))</code>
        </div>
      </div>

      <div class="neo-card bg-neo-white">
        <h3 class="text-xl font-bold text-neo-black mb-4">🛣️ Router Lazy Loading</h3>
        <p class="text-neo-black mb-4">
          Load route components only when the route is visited, reducing initial bundle size.
        </p>
        <div class="bg-neo-purple text-neo-black p-3 border-2 border-neo-black">
          <code class="text-sm">
{
  path: '/about',
  name: 'About',
  component: () => import('./views/ComponentName.vue')
}
          </code>
        </div>
      </div>
    </section>

    <!-- demo -->
    <section class="neo-section bg-neo-blue">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">🎭 DYNAMIC COMPONENT LOADING</h2>

      <div class="neo-card bg-neo-white mb-6">
        <h3 class="text-lg font-bold text-neo-black mb-4">Component Selector</h3>
        <div class="grid grid-cols-1 gap-4">
          <button
            v-for="comp in availableComponents"
            :key="comp.name"
            @click="loadComponent(comp.name)"
            class="neo-button text-neo-black"
            :class="[
              comp.color,
              { 'ring-4 ring-neo-black': currentComponent === comp.name },
            ]"
          >
            {{ comp.label }}
          </button>
        </div>
      </div>

      <div class="neo-card bg-neo-white">
        <h3 class="text-lg font-bold text-neo-black mb-4">
          Dynamic Component Area
        </h3>

        <div class="min-h-[300px] border-4 border-neo-black p-4 bg-neo-yellow">
          <Suspense>
            <template #default>
              <component
                v-if="currentComponentInstance"
                :is="currentComponentInstance"
              />
            </template>
            <template #fallback>
              <div class="flex justify-center items-center h-[200px]">
                <div class="text-xl font-bold text-neo-black">Loading component...</div>
              </div>
            </template>
          </Suspense>

          <div
            v-if="!currentComponentInstance"
            class="text-center py-30"
          >
            <div class="text-xl font-bold text-neo-black">Select a component to load</div>
            <div class="text-sm text-neo-black">
              Components will be fetched dynamically
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- performance Benefits -->
    <section class="neo-section bg-neo-purple">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">🎯 PERFORMANCE BENEFITS</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="neo-card bg-neo-white text-center">
          <div class="text-4xl mb-4">⚡</div>
          <h3 class="text-lg font-bold text-neo-black mb-2">Faster Initial Load</h3>
          <p class="text-sm text-neo-black">
            Smaller initial bundle size means faster first contentful paint
          </p>
        </div>

        <div class="neo-card bg-neo-white text-center">
          <div class="text-4xl mb-4">💾</div>
          <h3 class="text-lg font-bold text-neo-black mb-2">Reduced Memory Usage</h3>
          <p class="text-sm text-neo-black">Only load what's needed, when it's needed</p>
        </div>

        <div class="neo-card bg-neo-white text-center">
          <div class="text-4xl mb-4">📊</div>
          <h3 class="text-lg font-bold text-neo-black mb-2">Better Core Web Vitals</h3>
          <p class="text-sm text-neo-black">Improved LCP, FID, and CLS scores</p>
        </div>
      </div>
    </section>
  </div>
</template>
