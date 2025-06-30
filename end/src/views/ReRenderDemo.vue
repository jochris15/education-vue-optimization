<script setup>
import { ref, computed, watch, defineAsyncComponent } from "vue";

// Lazy load heavy components
const ItemComponent = defineAsyncComponent(() =>
  import("../components/ItemComponent.vue")
);
const ExpensiveComponent = defineAsyncComponent(() =>
  import("../components/ExpensiveComponent.vue")
);
const HeavyComponent = defineAsyncComponent(() =>
  import("../components/HeavyComponent.vue")
);

// Key demo
const itemsWithoutKey = ref([
  { id: 1, name: "Apple", value: "" },
  { id: 2, name: "Banana", value: "" },
  { id: 3, name: "Cherry", value: "" },
]);

const itemsWithKey = ref([
  { id: 1, name: "Apple", value: "" },
  { id: 2, name: "Banana", value: "" },
  { id: 3, name: "Cherry", value: "" },
]);

const shuffleItemsWithoutKey = () => {
  itemsWithoutKey.value = [...itemsWithoutKey.value].sort(() => Math.random() - 0.5);
};

const shuffleItemsWithKey = () => {
  itemsWithKey.value = [...itemsWithKey.value].sort(() => Math.random() - 0.5);
};

// v-once demo
const counter = ref(0);
const calculationCalls = ref(0);

const expensiveCalculation = computed(() => {
  // Simulate expensive calculation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random();
  }
  return Math.round(result);
});

// Track calculation calls with a watcher instead
watch(
  expensiveCalculation,
  () => {
    calculationCalls.value++;
  },
  { immediate: true }
);

const expensiveCalculationOnce = computed(() => {
  // This will only be calculated once due to v-once
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random();
  }
  return Math.round(result);
});

// v-memo demo
const memoDependency = ref(0);
const otherValue = ref(0);
const memoRenderCount = ref(0);
const memoOptimizedRenderCount = ref(0);

// v-show vs v-if demo
const showVIf = ref(true);
const showVShow = ref(true);
const vIfMountCount = ref(0);
const vIfUnmountCount = ref(0);
const vShowMountCount = ref(0);
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <section class="text-center">
      <h1 class="neo-title inline-block mb-4">🎯 RE-RENDER OPTIMIZATION</h1>
      <p class="text-xl text-neo-black max-w-3xl mx-auto">
        Learn techniques to prevent unnecessary component re-renders!
      </p>
    </section>

    <!-- Theory Section -->
    <section class="neo-section bg-neo-yellow">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">📚 OPTIMIZATION TECHNIQUES</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-2">🔑 KEY Attribute</h3>
          <p class="text-sm text-neo-black">
            Helps Vue identify which items have changed in lists
          </p>
        </div>
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-2">1️⃣ v-once</h3>
          <p class="text-sm text-neo-black">Renders element/component only once</p>
        </div>
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-2">🧠 v-memo</h3>
          <p class="text-sm text-neo-black">Caches template based on dependency array</p>
        </div>
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-2">👁️ v-show vs v-if</h3>
          <p class="text-sm text-neo-black">
            v-show for frequent toggles, v-if for conditional
          </p>
        </div>
      </div>
    </section>

    <!-- Key Attribute Demo -->
    <section class="neo-section bg-neo-pink">
      <h2 class="text-2xl font-bold mb-6 text-neo-white">🔑 KEY ATTRIBUTE DEMO</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Without Key -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">❌ Without Key</h3>
          <button
            @click="shuffleItemsWithoutKey"
            class="neo-button bg-neo-pink text-neo-white mb-4"
          >
            Shuffle Items
          </button>
          <div class="space-y-2">
            <div
              v-for="item in itemsWithoutKey"
              :key="item.id"
              class="neo-card bg-neo-yellow p-3 text-neo-black"
            >
              <ItemComponent
                :item="item"
                @update:value="(value) => (item.value = value)"
              />
            </div>
          </div>
          <div class="text-sm text-neo-black mt-4">
            🔥 Notice how input values don't follow items when shuffled
          </div>
        </div>

        <!-- With Key -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">✅ With Key</h3>
          <button
            @click="shuffleItemsWithKey"
            class="neo-button bg-neo-green text-neo-white mb-4"
          >
            Shuffle Items
          </button>
          <div class="space-y-2">
            <div
              v-for="item in itemsWithKey"
              :key="item.id"
              class="neo-card bg-neo-blue p-3 text-neo-white"
            >
              <ItemComponent
                :item="item"
                @update:value="(value) => (item.value = value)"
              />
            </div>
          </div>
          <div class="text-sm text-neo-black mt-4">
            ✅ Input values correctly follow items when shuffled
          </div>
        </div>
      </div>
    </section>

    <!-- v-once Demo -->
    <section class="neo-section bg-neo-blue">
      <h2 class="text-2xl font-bold mb-6 text-neo-white">1️⃣ V-ONCE DEMO</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Without v-once -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">❌ Without v-once</h3>
          <div class="mb-4">
            <label class="block text-sm font-bold text-neo-black mb-2"
              >Update Counter:</label
            >
            <button @click="counter++" class="neo-button bg-neo-pink text-neo-white">
              Count: {{ counter }}
            </button>
          </div>
          <div class="neo-card bg-neo-yellow p-4">
            <h4 class="font-bold text-neo-black mb-2">Re-renders Every Time:</h4>
            <div class="text-2xl font-bold text-neo-black">
              {{ expensiveCalculation }}
            </div>
            <div class="text-sm text-neo-black">
              Calculation calls: {{ calculationCalls }}
            </div>
          </div>
        </div>

        <!-- With v-once -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">✅ With v-once</h3>
          <div class="mb-4">
            <label class="block text-sm font-bold text-neo-black mb-2"
              >Counter Value:</label
            >
            <div class="text-2xl font-bold text-neo-black">{{ counter }}</div>
          </div>
          <div class="neo-card bg-neo-green p-4 text-neo-white">
            <h4 class="font-bold mb-2">Rendered Only Once:</h4>
            <div v-once class="text-2xl font-bold">{{ expensiveCalculationOnce }}</div>
            <div class="text-sm">This won't change even if counter updates!</div>
          </div>
        </div>
      </div>
    </section>

    <!-- v-memo Demo -->
    <section class="neo-section bg-neo-green">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">🧠 V-MEMO DEMO</h2>

      <div class="space-y-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">Control Panel</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-bold text-neo-black mb-2"
                >Memo Dependency:</label
              >
              <button
                @click="memoDependency++"
                class="neo-button bg-neo-blue text-neo-white w-full"
              >
                Memo Dep: {{ memoDependency }}
              </button>
            </div>
            <div>
              <label class="block text-sm font-bold text-neo-black mb-2"
                >Other Value:</label
              >
              <button
                @click="otherValue++"
                class="neo-button bg-neo-purple text-neo-white w-full"
              >
                Other: {{ otherValue }}
              </button>
            </div>
            <div>
              <label class="block text-sm font-bold text-neo-black mb-2"
                >Render Count:</label
              >
              <div class="text-2xl font-bold text-neo-black text-center">
                {{ memoRenderCount }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Without v-memo -->
          <div class="neo-card bg-neo-white">
            <h3 class="text-lg font-bold text-neo-black mb-4">❌ Without v-memo</h3>
            <div class="neo-card bg-neo-pink p-4 text-neo-white">
              <ExpensiveComponent
                :memoDep="memoDependency"
                :otherVal="otherValue"
                @render="memoRenderCount++"
              />
            </div>
            <div class="text-sm text-neo-black mt-2">
              🔥 Re-renders on ANY prop change
            </div>
          </div>

          <!-- With v-memo -->
          <div class="neo-card bg-neo-white">
            <h3 class="text-lg font-bold text-neo-black mb-4">✅ With v-memo</h3>
            <div
              v-memo="[memoDependency]"
              class="neo-card bg-neo-green p-4 text-neo-white"
            >
              <ExpensiveComponent
                :memoDep="memoDependency"
                :otherVal="otherValue"
                @render="memoOptimizedRenderCount++"
              />
            </div>
            <div class="text-sm text-neo-black mt-2">
              ✅ Only re-renders when memoDependency changes
            </div>
            <div class="text-sm text-neo-black">
              Optimized renders: {{ memoOptimizedRenderCount }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- v-show vs v-if Demo -->
    <section class="neo-section bg-neo-purple">
      <h2 class="text-2xl font-bold mb-6 text-neo-white">👁️ V-SHOW vs V-IF DEMO</h2>

      <div class="space-y-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">Toggle Controls</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              @click="showVIf = !showVIf"
              class="neo-button text-neo-white"
              :class="showVIf ? 'bg-neo-green' : 'bg-neo-pink'"
            >
              v-if: {{ showVIf ? "SHOWN" : "HIDDEN" }}
            </button>
            <button
              @click="showVShow = !showVShow"
              class="neo-button text-neo-white"
              :class="showVShow ? 'bg-neo-green' : 'bg-neo-pink'"
            >
              v-show: {{ showVShow ? "SHOWN" : "HIDDEN" }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- v-if Demo -->
          <div class="neo-card bg-neo-white">
            <h3 class="text-lg font-bold text-neo-black mb-4">🔄 Using v-if</h3>
            <div class="neo-card bg-neo-yellow p-4 min-h-[200px]">
              <div v-if="showVIf">
                <HeavyComponent
                  title="v-if Component"
                  @mount="vIfMountCount++"
                  @unmount="vIfUnmountCount++"
                />
              </div>
              <div v-else class="text-neo-black text-center py-8">
                Component is completely removed from DOM
              </div>
            </div>
            <div class="text-sm text-neo-black mt-2">
              <div>Mounts: {{ vIfMountCount }}</div>
              <div>Unmounts: {{ vIfUnmountCount }}</div>
              <div>🔥 Component recreated each time</div>
            </div>
          </div>

          <!-- v-show Demo -->
          <div class="neo-card bg-neo-white">
            <h3 class="text-lg font-bold text-neo-black mb-4">👁️ Using v-show</h3>
            <div class="neo-card bg-neo-blue text-neo-white p-4 min-h-[200px]">
              <div v-show="showVShow">
                <HeavyComponent title="v-show Component" @mount="vShowMountCount++" />
              </div>
            </div>
            <div class="text-sm text-neo-black mt-2">
              <div>Mounts: {{ vShowMountCount }}</div>
              <div>Unmounts: 0</div>
              <div>✅ Component stays in DOM, just hidden</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
