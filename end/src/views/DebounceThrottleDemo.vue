<script setup>
import { ref } from "vue";
import { debounce, throttle } from "lodash-es";

// search demo
const normalSearch = ref("");
const debouncedSearch = ref("");
const throttledSearch = ref("");

const normalSearchCount = ref(0);
const debouncedSearchCount = ref(0);
const throttledSearchCount = ref(0);

const normalSearchTime = ref("");
const debouncedSearchTime = ref("");
const throttledSearchTime = ref("");

// handlers only for counting the calls via input events
const handleNormalSearch = () => {
  normalSearchCount.value++;
  normalSearchTime.value = new Date().toLocaleTimeString();
};

const handleDebouncedSearch = debounce(() => {
  debouncedSearchCount.value++;
  debouncedSearchTime.value = new Date().toLocaleTimeString();
}, 500); // wait 500ms after the user stops typing to call the API

const handleThrottledSearch = throttle(() => {
  throttledSearchCount.value++;
  throttledSearchTime.value = new Date().toLocaleTimeString();
}, 1000); // max 1 call per second, even if the user keeps typing


// scroll demo
const normalScrollCount = ref(0);
const throttledScrollCount = ref(0);

// handlers only for counting the scroll events
const handleNormalScroll = () => {
  normalScrollCount.value++;
};

const handleThrottledScroll = throttle(() => {
  throttledScrollCount.value++;
}, 1000); // max 1 call per second, even if the user keeps scrolling

// click demo
const normalClickCount = ref(0);
const throttleClickCount = ref(0);

// handlers only for counting the clicks
const handleNormalClick = () => {
  normalClickCount.value++;
};

const handleThrottleClick = throttle(() => {
  throttleClickCount.value++;
}, 1000); // max 1 call per second, even if the user keeps clicking
</script>

<template>
  <div class="space-y-8">
    <section class="text-center">
      <h1 class="neo-title inline-block mb-4">⏱️ DEBOUNCE & THROTTLE</h1>
      <p class="text-xl text-neo-black max-w-3xl mx-auto">
        Control function execution frequency to improve performance!
      </p>
    </section>

    <!-- theory -->
    <section class="neo-section bg-neo-blue">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">
        📚 UNDERSTANDING THE DIFFERENCE
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-neo-black">
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">🕐 DEBOUNCE</h3>
          <p class="text-neo-black mb-4">
            Delays function execution until NO events occur for X milliseconds.
          </p>
          <div class="bg-neo-yellow p-3 border-2 border-neo-black mb-4">
            <strong>Use Case:</strong> Search input, form validation, API calls
          </div>
          <div class="text-sm text-neo-black">
            ⏰ Perfect for: "Wait until user stops typing"
          </div>
        </div>

        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">⚡ THROTTLE</h3>
          <p class="text-neo-black mb-4">
            Limits function execution to once every X milliseconds, even if events keep
            coming.
          </p>
          <div class="bg-neo-pink text-neo-black p-3 border-2 border-neo-black mb-4">
            <strong>Use Case:</strong> Scroll events, resize events, button clicks
          </div>
          <div class="text-sm text-neo-black">
            ⏰ Perfect for: "Execute at most once every X milliseconds"
          </div>
        </div>
      </div>
    </section>

    <!-- search demo -->
    <section class="neo-section bg-neo-pink">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">🔍 SEARCH INPUT DEMO</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- no optimization -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">❌ No Optimization</h3>
          <input
            v-model="normalSearch"
            @input="handleNormalSearch"
            class="neo-input w-full mb-4"
            placeholder="Search without optimization..."
          />
          <div class="bg-neo-pink text-neo-black p-3 border-2 border-neo-black mb-4">
            <div class="text-sm">API Calls: {{ normalSearchCount }}</div>
            <div class="text-xs">Last call: {{ normalSearchTime }}</div>
          </div>
          <div class="text-xs text-neo-black">
            🔥 Every keystroke triggers an API call!
          </div>
        </div>

        <!-- debounced -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">✅ Debounced (500ms)</h3>
          <input
            v-model="debouncedSearch"
            @input="handleDebouncedSearch"
            class="neo-input w-full mb-4"
            placeholder="Search with debounce..."
          />
          <div class="bg-neo-green text-neo-black p-3 border-2 border-neo-black mb-4">
            <div class="text-sm">API Calls: {{ debouncedSearchCount }}</div>
            <div class="text-xs">Last call: {{ debouncedSearchTime }}</div>
          </div>
          <div class="text-xs text-neo-black">⏱️ Waits 500ms after you stop typing</div>
        </div>

        <!-- throttled -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">⚡ Throttled (1000ms)</h3>
          <input
            v-model="throttledSearch"
            @input="handleThrottledSearch"
            class="neo-input w-full mb-4"
            placeholder="Search with throttle..."
          />
          <div class="bg-neo-blue text-neo-black p-3 border-2 border-neo-black mb-4">
            <div class="text-sm">API Calls: {{ throttledSearchCount }}</div>
            <div class="text-xs">Last call: {{ throttledSearchTime }}</div>
          </div>
          <div class="text-xs text-neo-black">⚡ Maximum 1 call per second</div>
        </div>
      </div>
    </section>

    <!-- scroll demo -->
    <section class="neo-section bg-neo-green">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">📜 SCROLL EVENT DEMO</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- normal scroll -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">❌ Normal Scroll Handler</h3>
          <div
            @scroll="handleNormalScroll"
            class="h-64 overflow-y-auto border-4 border-neo-black p-4 bg-neo-yellow"
          >
            <div v-for="n in 50" :key="n" class="py-2 border-b border-neo-black text-neo-black">
              Item {{ n }} - Scroll to see the effect!
            </div>
          </div>
          <div class="mt-4 text-center">
            <div class="text-2xl font-bold text-neo-pink">{{ normalScrollCount }}</div>
            <div class="text-sm text-neo-black">Scroll Events Fired</div>
          </div>
        </div>

        <!-- throttled scroll -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">
            ✅ Throttled Scroll Handler
          </h3>
          <div
            @scroll="handleThrottledScroll"
            class="h-64 overflow-y-auto border-4 border-neo-black p-4 bg-neo-blue text-neo-black"
          >
            <div v-for="n in 50" :key="n" class="py-2 border-b border-neo-black
            text-neo-black">
              Item {{ n }} - Much more efficient scrolling!
            </div>
          </div>
          <div class="mt-4 text-center">
            <div class="text-2xl font-bold text-neo-blue">{{ throttledScrollCount }}</div>
            <div class="text-sm text-neo-black">Throttled Events Fired</div>
          </div>
        </div>
      </div>
    </section>

    <!-- button click demo -->
    <section class="neo-section bg-neo-purple">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">🖱️ BUTTON CLICK DEMO</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- normal button -->
        <div class="neo-card bg-neo-white text-center">
          <h3 class="text-lg font-bold text-neo-black mb-4">❌ Normal Button</h3>
          <button
            @click="handleNormalClick"
            class="neo-button bg-neo-pink text-neo-black mb-4"
          >
            CLICK ME RAPIDLY!
          </button>
          <div class="text-2xl font-bold text-neo-pink">{{ normalClickCount }}</div>
          <div class="text-sm text-neo-black">Clicks Processed</div>
          <div class="text-xs text-neo-black mt-2">
            🔥 Every click is processed immediately
          </div>
        </div>

        <!-- throttle button -->
        <div class="neo-card bg-neo-white text-center">
          <h3 class="text-lg font-bold text-neo-black mb-4">✅ Throttle Button</h3>
          <button
            @click="handleThrottleClick"
            class="neo-button bg-neo-green text-neo-black mb-4"
          >
            CLICK ME RAPIDLY!
          </button>
          <div class="text-2xl font-bold text-neo-green">{{ throttleClickCount }}</div>
          <div class="text-sm text-neo-black">Clicks Processed</div>
          <div class="text-xs text-neo-black mt-2">
            ⏱️ Maximum 1 click processed every second
          </div>
        </div>
      </div>
    </section>
    
    <section class="neo-section bg-neo-yellow">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">📊 PERFORMANCE SUMMARY</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="neo-card bg-neo-white text-center">
          <div class="text-xl font-bold text-neo-pink">
            {{ normalSearchCount + normalScrollCount + normalClickCount }}
          </div>
          <div class="text-sm text-neo-black">Total Normal Events</div>
        </div>
        <div class="neo-card bg-neo-white text-center">
          <div class="text-xl font-bold text-neo-green">
            {{ debouncedSearchCount + throttleClickCount }}
          </div>
          <div class="text-sm text-neo-black">Total Debounced Events</div>
        </div>
        <div class="neo-card bg-neo-white text-center">
          <div class="text-xl font-bold text-neo-blue">
            {{ throttledSearchCount + throttledScrollCount }}
          </div>
          <div class="text-sm text-neo-black">Total Throttled Events</div>
        </div>
        <div class="neo-card bg-neo-white text-center">
          <div class="text-xl font-bold text-neo-purple">
            {{
              Math.round(
                ((debouncedSearchCount +
                  throttleClickCount +
                  throttledSearchCount +
                  throttledScrollCount) /
                  (normalSearchCount + normalScrollCount + normalClickCount || 1)) *
                  100
              )
            }}%
          </div>
          <div class="text-sm text-neo-black">Efficiency Gained</div>
        </div>
      </div>
    </section>
  </div>
</template>
