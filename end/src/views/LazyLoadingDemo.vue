<script setup>
import { ref, computed, defineAsyncComponent } from "vue";

// Lazy load the LazyImage component
const LazyImage = defineAsyncComponent(() => import("../components/LazyImage.vue"));

// Component loading state
const currentComponent = ref("");
const currentComponentInstance = ref(null);
const loadingComponent = ref("");
const componentsLoaded = ref([]);
const loadTimes = ref([]);

const availableComponents = [
  { name: "chart", label: "Chart", color: "bg-neo-pink" },
  { name: "table", label: "Data Table", color: "bg-neo-blue" },
  { name: "form", label: "Complex Form", color: "bg-neo-green" },
  { name: "dashboard", label: "Dashboard", color: "bg-neo-purple" },
];

const loadComponent = async (componentName) => {
  if (loadingComponent.value) return;

  loadingComponent.value = componentName;
  const startTime = Date.now();

  try {
    // Simulate network delay for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Dynamic import based on component name
    let component;
    switch (componentName) {
      case "chart":
        component = defineAsyncComponent(() =>
          import("../components/ChartComponent.vue")
        );
        break;
      case "table":
        component = defineAsyncComponent(() =>
          import("../components/TableComponent.vue")
        );
        break;
      case "form":
        component = defineAsyncComponent(() => import("../components/FormComponent.vue"));
        break;
      case "dashboard":
        component = defineAsyncComponent(() =>
          import("../components/DashboardComponent.vue")
        );
        break;
      default:
        component = null;
    }

    currentComponentInstance.value = component;
    currentComponent.value = componentName;

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    if (!componentsLoaded.value.includes(componentName)) {
      componentsLoaded.value.push(componentName);
      loadTimes.value.push(loadTime);
    }
  } catch (error) {
    console.error("Error loading component:", error);
  } finally {
    loadingComponent.value = "";
  }
};

const onComponentLoaded = () => {
  console.log("Component loaded successfully");
};

// Computed properties for stats
const totalLoadTime = computed(() =>
  loadTimes.value.reduce((sum, time) => sum + time, 0)
);

const averageLoadTime = computed(() =>
  loadTimes.value.length > 0
    ? Math.round(totalLoadTime.value / loadTimes.value.length)
    : 0
);

const bundlesSaved = computed(
  () => availableComponents.length - componentsLoaded.value.length
);

// Image lazy loading
const imagesLoaded = ref(0);

const onImageLoad = () => {
  imagesLoaded.value++;
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <section class="text-center">
      <h1 class="neo-title inline-block mb-4">🚀 LAZY LOADING</h1>
      <p class="text-xl text-neo-black max-w-3xl mx-auto">
        Load components and resources only when needed to improve initial load time!
      </p>
    </section>

    <!-- Theory Section -->
    <section class="neo-section bg-neo-green">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">📚 LAZY LOADING TECHNIQUES</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">
            🎯 Route-based Lazy Loading
          </h3>
          <p class="text-neo-black mb-4">
            Load route components only when the route is visited using dynamic imports.
          </p>
          <div class="bg-neo-blue text-neo-white p-3 border-2 border-neo-black">
            <code class="text-sm">const Home = () => import('./Home.vue')</code>
          </div>
        </div>

        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">🧩 Component Lazy Loading</h3>
          <p class="text-neo-black mb-4">
            Use defineAsyncComponent to load components on demand.
          </p>
          <div class="bg-neo-purple text-neo-white p-3 border-2 border-neo-black">
            <code class="text-sm">defineAsyncComponent(() => import('./Heavy.vue'))</code>
          </div>
        </div>
      </div>
    </section>

    <!-- Bundle Size Demo -->
    <section class="neo-section bg-neo-pink">
      <h2 class="text-2xl font-bold mb-6 text-neo-white">📦 BUNDLE SIZE COMPARISON</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">❌ All Components Loaded</h3>
          <div class="space-y-3">
            <div class="bg-neo-pink text-neo-white p-3 border-2 border-neo-black">
              <div class="text-sm">Initial Bundle Size</div>
              <div class="text-2xl font-bold">~450KB</div>
            </div>
            <div class="text-sm text-neo-black">
              <div>✗ Heavy components loaded immediately</div>
              <div>✗ Unused routes loaded</div>
              <div>✗ Large initial download</div>
              <div>✗ Slower first paint</div>
            </div>
          </div>
        </div>

        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">✅ Lazy Loaded Components</h3>
          <div class="space-y-3">
            <div class="bg-neo-green text-neo-white p-3 border-2 border-neo-black">
              <div class="text-sm">Initial Bundle Size</div>
              <div class="text-2xl font-bold">~120KB</div>
            </div>
            <div class="text-sm text-neo-black">
              <div>✓ Only essential code loaded initially</div>
              <div>✓ Routes loaded on demand</div>
              <div>✓ Faster initial load</div>
              <div>✓ Better user experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Component Loading Demo -->
    <section class="neo-section bg-neo-blue">
      <h2 class="text-2xl font-bold mb-6 text-neo-white">🎭 DYNAMIC COMPONENT LOADING</h2>

      <div class="neo-card bg-neo-white mb-6">
        <h3 class="text-lg font-bold text-neo-black mb-4">Component Selector</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            v-for="comp in availableComponents"
            :key="comp.name"
            @click="loadComponent(comp.name)"
            class="neo-button text-neo-white"
            :class="[
              comp.color,
              { 'ring-4 ring-neo-black': currentComponent === comp.name },
            ]"
            :disabled="loadingComponent === comp.name"
          >
            {{ loadingComponent === comp.name ? "Loading..." : comp.label }}
          </button>
        </div>
      </div>

      <div class="neo-card bg-neo-white">
        <h3 class="text-lg font-bold text-neo-black mb-4">
          Dynamic Component Area
          <span v-if="loadingComponent" class="text-sm text-neo-pink"
            >(Loading {{ loadingComponent }}...)</span
          >
        </h3>

        <div class="min-h-[300px] border-4 border-neo-black p-4 bg-neo-yellow">
          <Suspense>
            <template #default>
              <component
                v-if="currentComponentInstance"
                :is="currentComponentInstance"
                @loaded="onComponentLoaded"
              />
            </template>
            <template #fallback>
              <div class="text-center py-12">
                <div class="text-4xl mb-4">⏳</div>
                <div class="text-xl font-bold text-neo-black">Loading Component...</div>
                <div class="text-sm text-neo-black">
                  This demonstrates async component loading
                </div>
              </div>
            </template>
          </Suspense>

          <div
            v-if="!currentComponentInstance && !loadingComponent"
            class="text-center py-12"
          >
            <div class="text-4xl mb-4">🎯</div>
            <div class="text-xl font-bold text-neo-black">Select a component to load</div>
            <div class="text-sm text-neo-black">
              Components will be fetched dynamically
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Stats -->
      <div class="neo-card bg-neo-white mt-6">
        <h3 class="text-lg font-bold text-neo-black mb-4">📊 Loading Statistics</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-neo-pink">
              {{ componentsLoaded.length }}
            </div>
            <div class="text-sm text-neo-black">Components Loaded</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-neo-blue">{{ totalLoadTime }}ms</div>
            <div class="text-sm text-neo-black">Total Load Time</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-neo-green">{{ averageLoadTime }}ms</div>
            <div class="text-sm text-neo-black">Average Load Time</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-neo-purple">{{ bundlesSaved }}</div>
            <div class="text-sm text-neo-black">Bundles Saved</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Lazy Loading Demo -->
    <section class="neo-section bg-neo-yellow">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">🖼️ IMAGE LAZY LOADING</h2>

      <div class="neo-card bg-neo-white">
        <h3 class="text-lg font-bold text-neo-black mb-4">Scroll to Load Images</h3>
        <p class="text-neo-black mb-6">
          Images below will only load when they come into view, saving bandwidth and
          improving initial page load.
        </p>

        <div class="h-96 overflow-y-auto border-4 border-neo-black p-4 bg-neo-blue">
          <div v-for="n in 20" :key="n" class="mb-6">
            <div class="neo-card bg-neo-white p-4">
              <h4 class="font-bold text-neo-black mb-2">Image {{ n }}</h4>
              <LazyImage
                :src="`https://picsum.photos/400/200?random=${n}`"
                :alt="`Random image ${n}`"
                @load="onImageLoad"
              />
            </div>
          </div>
        </div>

        <div class="mt-4 text-center">
          <div class="text-xl font-bold text-neo-black">
            {{ imagesLoaded }} / 20 Images Loaded
          </div>
          <div class="text-sm text-neo-black">Scroll to load more images</div>
        </div>
      </div>
    </section>

    <!-- Performance Benefits -->
    <section class="neo-section bg-neo-purple">
      <h2 class="text-2xl font-bold mb-6 text-neo-white">🎯 PERFORMANCE BENEFITS</h2>

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
