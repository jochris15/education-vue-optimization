<script setup>
import { ref, reactive, shallowRef, computed, watch, onUpdated } from "vue";

// Deep reactivity example
const deepUser = reactive({
  profile: {
    name: "John Doe",
    age: 25,
    skills: ["Vue.js", "JavaScript"],
  },
  settings: {
    theme: "dark",
    notifications: true,
  },
});

const deepRenderCount = ref(0);

// Shallow reactivity example
const shallowUser = shallowRef({
  profile: {
    name: "Jane Smith",
    age: 28,
    skills: ["React", "TypeScript"],
  },
  settings: {
    theme: "light",
    notifications: false,
  },
});

const shallowRenderCount = ref(0);

// Skills to add randomly
const skills = ["Vue.js", "React", "Angular", "Node.js", "Python", "Java", "Go", "Rust"];

const addDeepSkill = () => {
  const randomSkill = skills[Math.floor(Math.random() * skills.length)];
  deepUser.profile.skills.push(randomSkill);
};

const updateShallowUser = () => {
  // This will trigger reactivity because we're replacing the entire object
  shallowUser.value = {
    ...shallowUser.value,
    profile: {
      ...shallowUser.value.profile,
      name: "Updated Name",
      age: Math.floor(Math.random() * 50) + 20,
    },
  };
};

const updateShallowProperty = () => {
  // This WON'T trigger reactivity because it's a nested property change
  shallowUser.value.profile.name = "This won't update!";
};

// Computed vs Watch demo
const computedInput = ref("");
const watchInput = ref("");
const watchResult = ref("");
const computedCallCount = ref(0);
const watchCallCount = ref(0);

// Expensive computation simulation
const expensiveComputed = computed(() => {
  // Simulate expensive operation
  let result = "";
  for (let i = 0; i < 1000; i++) {
    result += computedInput.value.charAt(i % computedInput.value.length);
  }
  return `Processed: ${computedInput.value} (${result.length} chars)`;
});

// Track computed calls with a watcher instead
watch(expensiveComputed, () => {
  computedCallCount.value++;
}, { immediate: true });

// Watch example (less efficient for this use case)
watch(
  watchInput,
  (newValue) => {
    watchCallCount.value++;
    // Simulate expensive operation
    let result = "";
    for (let i = 0; i < 1000; i++) {
      result += newValue.charAt(i % newValue.length);
    }
    watchResult.value = `Processed: ${newValue} (${result.length} chars)`;
  },
  { immediate: true }
);

// Track renders
onUpdated(() => {
  // This is a simplified way to track renders
  // In practice, you'd want more sophisticated tracking
  if (document.activeElement?.closest(".neo-card:first-child")) {
    deepRenderCount.value++;
  } else if (document.activeElement?.closest(".neo-card:last-child")) {
    shallowRenderCount.value++;
  }
});
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <section class="text-center">
      <h1 class="neo-title inline-block mb-4">⚡ REACTIVITY OPTIMIZATION</h1>
      <p class="text-xl text-neo-black max-w-3xl mx-auto">
        Compare deep vs shallow reactivity and see the performance difference!
      </p>
    </section>

    <!-- Theory Section -->
    <section class="neo-section bg-neo-pink">
      <h2 class="text-2xl font-bold mb-4 text-neo-white">📚 THEORY</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-3">🔍 Deep Reactivity</h3>
          <p class="text-neo-black mb-3">
            <code class="bg-neo-yellow px-2 py-1">ref()</code> and
            <code class="bg-neo-yellow px-2 py-1">reactive()</code>
            create deep reactivity by default - all nested properties are tracked.
          </p>
          <p class="text-sm text-neo-black">
            ⚠️ Can cause performance overhead with large objects!
          </p>
        </div>
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-3">🏃 Shallow Reactivity</h3>
          <p class="text-neo-black mb-3">
            <code class="bg-neo-blue text-neo-white px-2 py-1">shallowRef()</code> and
            <code class="bg-neo-blue text-neo-white px-2 py-1">shallowReactive()</code>
            only track top-level changes.
          </p>
          <p class="text-sm text-neo-black">
            ✅ Better performance for large data structures!
          </p>
        </div>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="neo-section bg-neo-blue">
      <h2 class="text-2xl font-bold mb-6 text-neo-white">🎮 INTERACTIVE DEMO</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Deep Reactivity Demo -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">
            🔍 Deep Reactivity (ref/reactive)
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-neo-black mb-2"
                >Update User Name:</label
              >
              <input
                v-model="deepUser.profile.name"
                class="neo-input w-full"
                placeholder="Enter name..."
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-neo-black mb-2"
                >Update User Age:</label
              >
              <input
                v-model.number="deepUser.profile.age"
                type="number"
                class="neo-input w-full"
                placeholder="Enter age..."
              />
            </div>

            <button @click="addDeepSkill" class="neo-button bg-neo-green text-neo-white">
              Add Random Skill
            </button>

            <div class="bg-neo-yellow p-4 border-2 border-neo-black">
              <h4 class="font-bold text-neo-black mb-2">Current Data:</h4>
              <pre class="text-xs text-neo-black">{{
                JSON.stringify(deepUser, null, 2)
              }}</pre>
            </div>

            <div class="text-sm text-neo-black">
              <strong>Render Count:</strong> {{ deepRenderCount }}
            </div>
          </div>
        </div>

        <!-- Shallow Reactivity Demo -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">
            🏃 Shallow Reactivity (shallowRef)
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-neo-black mb-2"
                >Replace Entire Object:</label
              >
              <button
                @click="updateShallowUser"
                class="neo-button bg-neo-purple text-neo-white"
              >
                Update Shallow User
              </button>
            </div>

            <div>
              <label class="block text-sm font-bold text-neo-black mb-2"
                >Try Direct Property Update (Won't Work):</label
              >
              <button
                @click="updateShallowProperty"
                class="neo-button bg-neo-pink text-neo-white"
              >
                Update Property Directly
              </button>
            </div>

            <div class="bg-neo-yellow p-4 border-2 border-neo-black">
              <h4 class="font-bold text-neo-black mb-2">Current Data:</h4>
              <pre class="text-xs text-neo-black">{{
                JSON.stringify(shallowUser, null, 2)
              }}</pre>
            </div>

            <div class="text-sm text-neo-black">
              <strong>Render Count:</strong> {{ shallowRenderCount }}
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Comparison -->
      <div class="mt-8 neo-card bg-neo-yellow">
        <h3 class="text-xl font-bold text-neo-black mb-4">📊 Performance Comparison</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-neo-pink">{{ deepRenderCount }}</div>
            <div class="text-sm text-neo-black">Deep Reactivity Renders</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-neo-blue">{{ shallowRenderCount }}</div>
            <div class="text-sm text-neo-black">Shallow Reactivity Renders</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Computed vs Watch Demo -->
    <section class="neo-section bg-neo-green">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">🧮 COMPUTED vs WATCH</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">
            ✅ Using Computed (Optimized)
          </h3>
          <input
            v-model="computedInput"
            class="neo-input w-full mb-4"
            placeholder="Type something..."
          />
          <div class="bg-neo-blue text-neo-white p-3 border-2 border-neo-black">
            <strong>Computed Result:</strong> {{ expensiveComputed }}
          </div>
          <div class="text-sm text-neo-black mt-2">
            <strong>Computed Calls:</strong> {{ computedCallCount }}
          </div>
        </div>

        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">
            ❌ Using Watch (Less Optimal)
          </h3>
          <input
            v-model="watchInput"
            class="neo-input w-full mb-4"
            placeholder="Type something..."
          />
          <div class="bg-neo-pink text-neo-white p-3 border-2 border-neo-black">
            <strong>Watch Result:</strong> {{ watchResult }}
          </div>
          <div class="text-sm text-neo-black mt-2">
            <strong>Watch Calls:</strong> {{ watchCallCount }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
