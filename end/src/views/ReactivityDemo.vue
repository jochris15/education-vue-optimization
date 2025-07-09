<script setup>
import { ref, reactive, shallowReactive, watch, computed } from "vue";

// reusable nested object
const createSimpleObject = (prefix = "Item") => ({
  name: `${prefix} User`,
  settings: {
    darkMode: true,
    notifications: true,
  },
  count: 0,
});

// deep reactivity example - tracks all nested changes
const deepUser = reactive(createSimpleObject("Deep"));
const deepChangeMessage = ref("No changes yet");

// shallow reactivity example - only tracks top-level changes
const shallowUser = shallowReactive(createSimpleObject("Shallow"));
const shallowChangeMessage = ref("No changes yet");

// force update trigger only for demo
const forceUpdate = ref(0);

// simple operations only for demo
const updateDeepName = () => {
  deepUser.name = `Deep User ${Date.now().toString().slice(-4)}`;
  deepChangeMessage.value = "Top-level property updated";
};

const updateDeepNestedProperty = () => {
  // this will trigger watchers because reactive() tracks nested changes
  deepUser.settings.darkMode = !deepUser.settings.darkMode;
  deepChangeMessage.value = "Nested property updated - UI updates automatically";
};

const incrementDeepCount = () => {
  deepUser.count++;
  deepChangeMessage.value = "Count incremented";
};

// shallow reactivity operations
const updateShallowName = () => {
  shallowUser.name = `Shallow User ${Date.now().toString().slice(-4)}`;
  shallowChangeMessage.value = "Top-level property updated - UI updates automatically";
};

const updateShallowNestedProperty = () => {
  // this wont trigger reactivity because shallowReactive doesnt track nested changes
  shallowUser.settings.darkMode = !shallowUser.settings.darkMode;
  shallowChangeMessage.value = "Nested property updated - UI will NOT update!";
};

const incrementShallowCount = () => {
  shallowUser.count++;
  shallowChangeMessage.value =
    "Count incremented - Top-level property changes are reactive";
};

const forceShallowUpdate = () => {
  // force update by replacing the entire nested object reference
  shallowUser.settings = { ...shallowUser.settings };
  shallowChangeMessage.value = "Forced update by replacing entire object reference";
  forceUpdate.value++;
};

// watcher only for demo
watch(
  deepUser,
  () => {
    console.log("Deep reactive object changed!");
  },
  { deep: true } // Deep watch tracks ALL nested changes
);

watch(
  shallowUser,
  () => {
    console.log("Shallow reactive object changed!");
  }
  // no deep option - only tracks top-level changes
);

//-----------------------------------------------------------------------------//
// Computed vs Watchers 
const firstName = ref("John");
const lastName = ref("Doe");
const price = ref(10);
const quantity = ref(1);

// tracking counts for visualization
const computedExecutionCount = ref(0);
const watchExecutionCount = ref(0);

// computed example - name formatting
const fullName = computed(() => {
  console.log("Computing fullName...");
  // return the computed value without side effects
  return `${firstName.value} ${lastName.value}`;
});

// track when computed property is recalculated
watch(fullName, () => {
  computedExecutionCount.value++;
});

// computed example - total price calculation
const totalPrice = computed(() => {
  console.log("Computing total price...");
  // This will only recalculate when price or quantity changes AND when the value is used
  return price.value * quantity.value;
});

// watcher example - shopping cart 
const cartTotal = ref(price.value * quantity.value);
const shippingMessage = ref("");

// watcher example - watch cart changes to show shipping message
watch([price, quantity], ([newPrice, newQuantity]) => {
  console.log("Watching cart changes...");
  watchExecutionCount.value++;
  
  // update the cart total
  cartTotal.value = newPrice * newQuantity;
  
  if (cartTotal.value >= 100) {
    shippingMessage.value = "Free shipping!";
  } else {
    const remaining = 100 - cartTotal.value;
    shippingMessage.value = `Add $${remaining} more for free shipping`;
  }
});

// watchers example - log user activity
const userActivityLog = ref([]);
watch(fullName, (newName) => {
  console.log("User name changed to:", newName);
  userActivityLog.value.push(`Name changed to ${newName} at ${new Date().toLocaleTimeString()}`);
});

// demo control functions
const resetDemoData = () => {
  firstName.value = "John";
  lastName.value = "Doe";
  price.value = 10;
  quantity.value = 1;
  computedExecutionCount.value = 0;
  watchExecutionCount.value = 0;
  userActivityLog.value = [];
  shippingMessage.value = "";
};

const updateNameDemo = () => {
  resetDemoData();
  firstName.value = `John${Date.now().toString().slice(-4)}`;
};

const updateCartDemo = () => {
  resetDemoData();
  price.value += 5;
  quantity.value += 1;
};

const addExpensiveItemDemo = () => {
  resetDemoData();
  price.value = 120;
  quantity.value = 1;
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <section class="text-center">
      <h1 class="neo-title inline-block mb-4">⚡ REACTIVITY IN VUE</h1>
      <p class="text-xl text-neo-black max-w-3xl mx-auto">
        Simple examples of deep vs shallow reactivity
      </p>
    </section>

    <!-- Theory Section -->
    <section class="neo-section bg-neo-pink">
      <h2 class="text-2xl font-bold mb-4 text-neo-white">📚 THEORY</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-3">🔍 Deep Reactivity</h3>
          <p class="text-neo-black mb-3">
            <code class="bg-neo-yellow px-2 py-1">reactive()</code>
            tracks ALL nested properties recursively.
          </p>
          <p class="text-sm text-neo-black">
            ✅ When nested properties change, the UI updates automatically!
          </p>
        </div>
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-3">🏃 Shallow Reactivity</h3>
          <p class="text-neo-black mb-3">
            <code class="bg-neo-blue text-neo-white px-2 py-1">shallowReactive()</code>
            only tracks top-level property changes.
          </p>
          <p class="text-sm text-neo-black">
            ⚠️ Nested changes won't update the UI automatically!
          </p>
        </div>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="neo-section bg-neo-blue">
      <h2 class="text-2xl font-bold mb-6 text-neo-white">🎮 EXAMPLES</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Deep Reactivity Demo -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">
            🔍 Deep Reactivity Example
          </h3>
          <p class="text-sm text-neo-black mb-4">
            Using <code>reactive()</code> - all nested changes are tracked automatically
          </p>

          <div class="space-y-4">
            <button
              @click="updateDeepName"
              class="neo-button bg-neo-green text-neo-white w-full"
            >
              ✅ Update Name (Top Level)
            </button>

            <button
              @click="incrementDeepCount"
              class="neo-button bg-neo-blue text-neo-white w-full"
            >
              🔢 Increment Count (Top Level)
            </button>

            <button
              @click="updateDeepNestedProperty"
              class="neo-button bg-neo-yellow text-neo-black w-full"
            >
              🌓 Toggle Dark Mode (Nested Property)
            </button>

            <div class="bg-neo-yellow p-4 border-2 border-neo-black">
              <h4 class="font-bold text-neo-black mb-2">Status:</h4>
              <div class="text-sm text-neo-black space-y-1">
                <div><strong>Last Action:</strong> {{ deepChangeMessage }}</div>
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
                  <span class="font-bold text-neo-black">👤 Name:</span>
                  <span class="bg-neo-yellow text-neo-black px-2 py-1 rounded font-bold">
                    {{ deepUser.name }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">🔢 Count:</span>
                  <span class="bg-neo-green text-neo-white px-2 py-1 rounded font-bold">
                    {{ deepUser.count }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">🌓 Dark Mode:</span>
                  <span
                    class="px-2 py-1 rounded font-bold"
                    :class="
                      deepUser.settings.darkMode
                        ? 'bg-neo-green text-neo-white'
                        : 'bg-neo-pink text-neo-white'
                    "
                  >
                    {{ deepUser.settings.darkMode ? "🌙 ON" : "☀️ OFF" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shallow Reactivity Demo -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">
            🏃 Shallow Reactivity Example
          </h3>
          <p class="text-sm text-neo-black mb-4">
            Using <code>shallowReactive()</code> - only top-level changes are tracked
          </p>

          <div class="space-y-4">
            <button
              @click="updateShallowName"
              class="neo-button bg-neo-green text-neo-white w-full"
            >
              ✅ Update Name (Top Level - Works)
            </button>

            <button
              @click="incrementShallowCount"
              class="neo-button bg-neo-blue text-neo-white w-full"
            >
              🔢 Increment Count (Top Level - Works)
            </button>

            <button
              @click="updateShallowNestedProperty"
              class="neo-button bg-neo-yellow text-neo-black w-full"
            >
              🌓 Toggle Dark Mode (Nested - Won't Update UI!)
            </button>

            <button
              @click="forceShallowUpdate"
              class="neo-button bg-neo-purple text-neo-white w-full"
            >
              🔄 Force Update (Replace Reference)
            </button>

            <div class="bg-neo-yellow p-4 border-2 border-neo-black">
              <h4 class="font-bold text-neo-black mb-2">Status:</h4>
              <div class="text-sm text-neo-black space-y-1">
                <div><strong>Last Action:</strong> {{ shallowChangeMessage }}</div>
                <div><strong>Force Updates:</strong> {{ forceUpdate }}</div>
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
                  <span class="font-bold text-neo-black">👤 Name:</span>
                  <span class="bg-neo-yellow text-neo-black px-2 py-1 rounded font-bold">
                    {{ shallowUser.name }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">🔢 Count:</span>
                  <span class="bg-neo-green text-neo-white px-2 py-1 rounded font-bold">
                    {{ shallowUser.count }}
                  </span>
                </div>
                <div
                  class="flex justify-between items-center bg-neo-white bg-opacity-90 px-3 py-2 rounded"
                >
                  <span class="font-bold text-neo-black">🌓 Dark Mode:</span>
                  <span
                    class="px-2 py-1 rounded font-bold"
                    :class="
                      shallowUser.settings.darkMode
                        ? 'bg-neo-green text-neo-white'
                        : 'bg-neo-pink text-neo-white'
                    "
                  >
                    {{ shallowUser.settings.darkMode ? "🌙 ON" : "☀️ OFF" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Differences -->
      <div class="mt-8 neo-card bg-neo-yellow">
        <h3 class="text-xl font-bold text-neo-black mb-4">🗝️ KEY DIFFERENCES</h3>

        <div class="p-4 bg-neo-white border-2 border-neo-black">
          <h4 class="font-bold text-neo-black mb-2">When to use which:</h4>
          <p class="text-sm text-neo-black">
            <strong>Deep Reactivity (reactive):</strong>
            <br />
            • Use when you need to track ALL property changes
            <br />
            • Changes to nested properties automatically update the UI
            <br />
            • Simplest to use, but can be less efficient for large objects
            <br /><br />
            <strong>Shallow Reactivity (shallowReactive):</strong>
            <br />
            • Use when you only need to track top-level properties
            <br />
            • Changes to nested objects need manual handling
            <br />
            • More efficient for large objects with deep nesting
            <br /><br />
            <strong>To update nested properties in shallowReactive:</strong>
            <br />
            • Replace the entire nested object with a new reference
            <br />
            • Example: <code>user.settings = {...user.settings, darkMode: true}</code>
          </p>
        </div>
      </div>
    </section>

    <!-- Computed vs Watchers Demo -->
    <section class="neo-section bg-neo-green">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">COMPUTED VS WATCHERS</h2>

      <!-- Shared controls at top -->
      <div class="bg-neo-white p-4 mb-6 border-4 border-neo-black">
        <h3 class="text-xl font-bold text-neo-black mb-4">Demo Controls</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            @click="updateNameDemo"
            class="neo-button bg-neo-purple text-neo-white w-full"
          >
            Update Name
          </button>
          
          <button
            @click="updateCartDemo"
            class="neo-button bg-neo-yellow text-neo-black w-full"
          >
            Update Cart
          </button>
          
          <button
            @click="addExpensiveItemDemo"
            class="neo-button bg-neo-pink text-neo-white w-full"
          >
            Add Expensive Item
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Computed Properties Demo -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">🧠 Computed Properties</h3>
          <p class="text-sm text-neo-black mb-4">
            <strong>Use Case:</strong> Formatting names and calculating prices - data transformations that return values
          </p>

          <div class="space-y-4">
            <div class="bg-neo-blue p-4 text-neo-white">
              <h4 class="font-bold mb-2">Example 1: Name Formatting</h4>
              <div class="flex flex-col gap-2 mb-4">
                <div class="flex gap-2">
                  <div><strong>First Name:</strong> {{ firstName }}</div>
                  <div><strong>Last Name:</strong> {{ lastName }}</div>
                </div>
                <div>
                  <strong>Full Name (Computed):</strong> {{ fullName }}
                  <div class="px-2 py-1 mt-1 inline-block bg-neo-purple text-neo-white rounded-full text-xs">
                    Recalculations: {{ computedExecutionCount }}
                  </div>
                </div>
              </div>
              
              <h4 class="font-bold mb-2">Example 2: Shopping Cart</h4>
              <div class="flex flex-col gap-2">
                <div class="flex gap-4">
                  <div><strong>Price:</strong> ${{ price }}</div>
                  <div><strong>Quantity:</strong> {{ quantity }}</div>
                </div>
                <div>
                  <strong>Total Price (Computed):</strong> ${{ totalPrice }}
                </div>
              </div>
            </div>

            <div class="bg-neo-yellow p-4 border-2 border-neo-black">
              <h4 class="font-bold text-neo-black mb-2">When to Use Computed Properties:</h4>
              <ul class="list-disc pl-5 text-sm text-neo-black">
                <li><strong>✅ For data transformations:</strong> formatting names, calculating totals</li>
                <li><strong>✅ For derived values:</strong> filtered lists, sorted arrays</li>
                <li><strong>✅ For template values:</strong> display data that depends on other values</li>
                <li><strong>✅ For caching:</strong> complex calculations that should be reused</li>
                <li><strong>✅ When you need a value:</strong> computed always returns a value</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Watchers Demo -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-xl font-bold text-neo-black mb-4">👀 Watchers</h3>
          <p class="text-sm text-neo-black mb-4">
            <strong>Use Case:</strong> Shipping notifications and activity logging - side effects that respond to changes
          </p>

          <div class="space-y-4">
            <div class="bg-neo-blue p-4 text-neo-white">
              <h4 class="font-bold mb-2">Example 1: Shopping Cart with Shipping</h4>
              <div class="flex flex-col gap-2 mb-4">
                <div><strong>Cart Total:</strong> ${{ cartTotal }}</div>
                <div>
                  <strong>Shipping Status:</strong> 
                  <div class="px-3 py-1 mt-1 inline-block rounded" 
                      :class="cartTotal >= 100 ? 'bg-neo-green text-neo-white' : 'bg-neo-yellow text-neo-black'">
                    {{ shippingMessage }}
                  </div>
                  <div class="px-2 py-1 mt-1 inline-block bg-neo-purple text-neo-white rounded-full text-xs">
                    Watcher runs: {{ watchExecutionCount }}
                  </div>
                </div>
              </div>
              
              <h4 class="font-bold mb-2">Example 2: User Activity Log</h4>
              <div class="max-h-20 overflow-y-auto p-2 bg-neo-black bg-opacity-50 rounded">
                <div v-for="(log, index) in userActivityLog" :key="index" class="text-sm">
                  {{ log }}
                </div>
                <div v-if="!userActivityLog.length" class="text-sm opacity-50">
                  No user activity yet. Try updating the name.
                </div>
              </div>
            </div>

            <div class="bg-neo-yellow p-4 border-2 border-neo-black">
              <h4 class="font-bold text-neo-black mb-2">When to Use Watchers:</h4>
              <ul class="list-disc pl-5 text-sm text-neo-black">
                <li><strong>✅ For side effects:</strong> showing notifications, alerts</li>
                <li><strong>✅ For async operations:</strong> API calls, debounced searches</li>
                <li><strong>✅ For tracking changes:</strong> logging, analytics</li>
                <li><strong>✅ For responding to events:</strong> form validation, saving data</li>
                <li><strong>✅ When you don't need a return value:</strong> watchers perform actions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
