<script setup>
import { ref, reactive, shallowReactive, computed, watch } from "vue";

// Create large nested objects to simulate real-world scenarios
const createLargeObject = (prefix = "Item") => ({
  profile: {
    name: `${prefix} User`,
    age: 25,
    skills: Array.from({ length: 100 }, (_, i) => `Skill ${i + 1}`),
    preferences: {
      theme: "dark",
      language: "en",
      notifications: {
        email: true,
        sms: false,
        push: true,
        marketing: Array.from({ length: 50 }, (_, i) => `Pref ${i}`),
      },
    },
  },
  metadata: {
    lastLogin: new Date().toISOString(),
    sessionData: Array.from({ length: 200 }, (_, i) => ({ id: i, value: Math.random() })),
    cache: Array.from({ length: 100 }, (_, i) => ({
      key: `cache_${i}`,
      data: Math.random(),
    })),
  },
});

// Deep reactivity example - tracks ALL nested properties
const deepUser = reactive(createLargeObject("Deep"));
const deepRenderCount = ref(0);
const deepWatchCount = ref(0);
const deepPerformanceTime = ref(0);

// Shallow reactivity example - only tracks top-level changes
const shallowUser = shallowReactive(createLargeObject("Shallow"));
const shallowRenderCount = ref(0);
const shallowWatchCount = ref(0);
const shallowPerformanceTime = ref(0);

// Skills to add randomly
const skills = ["Vue.js", "React", "Angular", "Node.js", "Python", "Java", "Go", "Rust"];

// Deep reactivity operations
const addDeepSkill = () => {
  const start = performance.now();
  const randomSkill = skills[Math.floor(Math.random() * skills.length)];
  deepUser.profile.skills.push(randomSkill);
  deepPerformanceTime.value = performance.now() - start;
};

const updateDeepNestedProperty = () => {
  const start = performance.now();
  // This will trigger deep watchers because reactive() tracks nested changes
  deepUser.profile.preferences.notifications.email = !deepUser.profile.preferences
    .notifications.email;
  deepPerformanceTime.value = performance.now() - start;
};

const massUpdateDeepObject = () => {
  const start = performance.now();
  // Multiple nested updates - each one triggers reactivity
  for (let i = 0; i < 10; i++) {
    deepUser.metadata.sessionData[i].value = Math.random();
  }
  deepPerformanceTime.value = performance.now() - start;
};

// Shallow reactivity operations
const addShallowSkill = () => {
  const start = performance.now();
  const randomSkill = skills[Math.floor(Math.random() * skills.length)];
  // For shallow reactivity, we need to replace the entire nested object
  shallowUser.profile = {
    ...shallowUser.profile,
    skills: [...shallowUser.profile.skills, randomSkill],
  };
  shallowPerformanceTime.value = performance.now() - start;
};

const updateShallowNestedProperty = () => {
  const start = performance.now();
  // This WON'T trigger watchers because shallowReactive doesn't track nested changes
  shallowUser.profile.preferences.notifications.email = !shallowUser.profile.preferences
    .notifications.email;
  shallowPerformanceTime.value = performance.now() - start;
};

const massUpdateShallowObject = () => {
  const start = performance.now();
  // These updates won't trigger reactivity because they're nested
  for (let i = 0; i < 10; i++) {
    shallowUser.metadata.sessionData[i].value = Math.random();
  }
  shallowPerformanceTime.value = performance.now() - start;
};

const forceShallowUpdate = () => {
  const start = performance.now();
  // Force update by replacing the entire object reference
  shallowUser.metadata = { ...shallowUser.metadata };
  shallowPerformanceTime.value = performance.now() - start;
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
watch(
  expensiveComputed,
  () => {
    computedCallCount.value++;
  },
  { immediate: true }
);

// Watch example, less efficient for this use case
watch(
  watchInput,
  (newValue) => {
    watchCallCount.value++;

    let result = "";
    for (let i = 0; i < 1000; i++) {
      result += newValue.charAt(i % newValue.length);
    }
    watchResult.value = `Processed: ${newValue} (${result.length} chars)`;
  },
  { immediate: true }
);

// Performance tracking watchers
watch(
  deepUser,
  () => {
    deepRenderCount.value++;
    deepWatchCount.value++;
  },
  { deep: true } // This is expensive! Tracks ALL nested properties
);

watch(
  shallowUser,
  () => {
    shallowRenderCount.value++;
    shallowWatchCount.value++;
  }
  // No deep option - only tracks top-level changes (much faster!)
);
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-3">🔍 Deep Reactivity</h3>
          <p class="text-neo-black mb-3">
            <code class="bg-neo-yellow px-2 py-1">reactive()</code> with
            <code class="bg-neo-yellow px-2 py-1">deep: true</code>
            tracks ALL nested properties recursively.
          </p>
          <p class="text-sm text-neo-black">
            ⚠️ Performance cost: O(n) where n = all nested properties!
          </p>
        </div>
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-3">🏃 Shallow Reactivity</h3>
          <p class="text-neo-black mb-3">
            <code class="bg-neo-blue text-neo-white px-2 py-1">shallowReactive()</code>
            only tracks top-level property changes.
          </p>
          <p class="text-sm text-neo-black">
            ✅ Performance: O(1) - constant time regardless of nesting!
          </p>
        </div>
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-3">📊 Real Impact</h3>
          <p class="text-neo-black mb-3">
            With 1000+ nested properties, deep reactivity can be
            <strong>10-100x slower</strong> than shallow.
          </p>
          <p class="text-sm text-neo-black">⚡ Test below to see the difference!</p>
        </div>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="neo-section bg-neo-blue">
      <h2 class="text-2xl font-bold mb-6 text-neo-white">🎮 PERFORMANCE COMPARISON</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Deep Reactivity Demo -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">
            🔍 Deep Reactivity (reactive + deep watch)
          </h3>
          <p class="text-sm text-neo-black mb-4">
            Large object with 500+ nested properties. Every change triggers watchers!
          </p>

          <div class="space-y-4">
            <button
              @click="addDeepSkill"
              class="neo-button bg-neo-green text-neo-white w-full"
            >
              ✅ Add Skill (Triggers Reactivity)
            </button>

            <button
              @click="updateDeepNestedProperty"
              class="neo-button bg-neo-yellow text-neo-black w-full"
            >
              ⚠️ Toggle Deep Notification (Expensive!)
            </button>

            <button
              @click="massUpdateDeepObject"
              class="neo-button bg-neo-pink text-neo-white w-full"
            >
              🐌 Mass Update 10 Properties (Very Slow!)
            </button>

            <button
              @click="massUpdateDeepObject"
              class="neo-button bg-neo-purple text-neo-white w-full"
            >
              🔄 Force Update (Always Triggers)
            </button>

            <div class="bg-neo-yellow p-4 border-2 border-neo-black">
              <h4 class="font-bold text-neo-black mb-2">Performance Metrics:</h4>
              <div class="text-sm text-neo-black space-y-1">
                <div><strong>Watch Calls:</strong> {{ deepWatchCount }}</div>
                <div><strong>Render Count:</strong> {{ deepRenderCount }}</div>
                <div>
                  <strong>Last Operation Time:</strong>
                  {{ deepPerformanceTime.toFixed(3) }}ms
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-r from-neo-blue to-neo-purple text-neo-black p-4 border-4 border-neo-black shadow-lg"
            >
              <h4 class="font-bold mb-3 text-lg flex items-center text-neo-white">
                📊 Live Object Status
              </h4>
              <div class="grid grid-cols-1 gap-2 text-sm">
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">🎯 Skills:</span>
                  <span class="bg-neo-yellow text-neo-black px-2 py-1 rounded font-bold">
                    {{ deepUser.profile.skills.length }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">📡 Session Data:</span>
                  <span class="bg-neo-green text-neo-white px-2 py-1 rounded font-bold">
                    {{ deepUser.metadata.sessionData.length }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">📧 Email Notifications:</span>
                  <span
                    class="px-2 py-1 rounded font-bold"
                    :class="
                      deepUser.profile.preferences.notifications.email
                        ? 'bg-neo-green text-neo-white'
                        : 'bg-neo-pink text-neo-white'
                    "
                  >
                    {{
                      deepUser.profile.preferences.notifications.email
                        ? "🟢 ON"
                        : "🔴 OFF"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shallow Reactivity Demo -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">
            🏃 Shallow Reactivity (shallowReactive)
          </h3>
          <p class="text-sm text-neo-black mb-4">
            Same large object, but only top-level changes trigger watchers!
          </p>

          <div class="space-y-4">
            <button
              @click="addShallowSkill"
              class="neo-button bg-neo-green text-neo-white w-full"
            >
              ✅ Add Skill (Triggers Reactivity)
            </button>

            <button
              @click="updateShallowNestedProperty"
              class="neo-button bg-neo-yellow text-neo-black w-full"
            >
              ⚡ Toggle Deep Notification (Fast - No Watchers!)
            </button>

            <button
              @click="massUpdateShallowObject"
              class="neo-button bg-neo-pink text-neo-white w-full"
            >
              🚀 Mass Update 10 Properties (Fast - No Watchers!)
            </button>

            <button
              @click="forceShallowUpdate"
              class="neo-button bg-neo-purple text-neo-white w-full"
            >
              🔄 Force Update (Replace Reference)
            </button>

            <div class="bg-neo-yellow p-4 border-2 border-neo-black">
              <h4 class="font-bold text-neo-black mb-2">Performance Metrics:</h4>
              <div class="text-sm text-neo-black space-y-1">
                <div><strong>Watch Calls:</strong> {{ shallowWatchCount }}</div>
                <div><strong>Render Count:</strong> {{ shallowRenderCount }}</div>
                <div>
                  <strong>Last Operation Time:</strong>
                  {{ shallowPerformanceTime.toFixed(3) }}ms
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-r from-neo-purple to-neo-pink text-neo-black p-4 border-4 border-neo-black shadow-lg"
            >
              <h4 class="font-bold mb-3 text-lg flex items-center text-neo-white">
                ⚡ Live Object Status
              </h4>
              <div class="grid grid-cols-1 gap-2 text-sm">
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">🎯 Skills:</span>
                  <span class="bg-neo-yellow text-neo-black px-2 py-1 rounded font-bold">
                    {{ shallowUser.profile.skills.length }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">📡 Session Data:</span>
                  <span class="bg-neo-green text-neo-white px-2 py-1 rounded font-bold">
                    {{ shallowUser.metadata.sessionData.length }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">📧 Email Notifications:</span>
                  <span
                    class="px-2 py-1 rounded font-bold"
                    :class="
                      shallowUser.profile.preferences.notifications.email
                        ? 'bg-neo-green text-neo-white'
                        : 'bg-neo-pink text-neo-white'
                    "
                  >
                    {{
                      shallowUser.profile.preferences.notifications.email
                        ? "🟢 ON"
                        : "🔴 OFF"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Comparison Chart -->
      <div class="mt-8 neo-card bg-neo-yellow">
        <h3 class="text-xl font-bold text-neo-black mb-4">📊 PERFORMANCE BATTLE</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div class="text-3xl font-bold text-neo-pink">{{ deepWatchCount }}</div>
            <div class="text-sm text-neo-black">Deep Watch Calls</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-neo-blue">{{ shallowWatchCount }}</div>
            <div class="text-sm text-neo-black">Shallow Watch Calls</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-neo-pink">
              {{ deepPerformanceTime.toFixed(1) }}ms
            </div>
            <div class="text-sm text-neo-black">Deep Last Operation</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-neo-blue">
              {{ shallowPerformanceTime.toFixed(1) }}ms
            </div>
            <div class="text-sm text-neo-black">Shallow Last Operation</div>
          </div>
        </div>

        <div class="mt-4 p-4 bg-neo-white border-2 border-neo-black">
          <h4 class="font-bold text-neo-black mb-2">🎯 Key Insight:</h4>
          <p class="text-sm text-neo-black">
            Try the "Mass Update" buttons! Deep reactivity will trigger watchers for EVERY
            nested change, while shallow reactivity won't trigger watchers at all (unless
            you force update).
            <br /><br />
            <strong>Performance Ratio:</strong>
            <span class="bg-neo-pink text-neo-white px-2 py-1">
              Deep is
              {{
                shallowPerformanceTime > 0
                  ? Math.max(
                      1,
                      Math.round(
                        deepPerformanceTime / Math.max(shallowPerformanceTime, 0.001)
                      )
                    )
                  : "∞"
              }}x slower
            </span>
          </p>
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
