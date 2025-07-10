<script setup>
import { ref} from "vue";
import MountUnmount from "../components/MountUnmount.vue";

// v-once demo
const counter = ref(0);

// v-memo demo
const memoText = ref('Initial text');
const nonDependency = ref(0);
const standardRenderCount = ref(0);
const memoRenderCount = ref(0);

// v-show vs v-if demo 
const showVIf = ref(true);
const showVShow = ref(true);
const vIfMountCount = ref(0);
const vIfUnmountCount = ref(0);
const vShowMountCount = ref(0);
</script>

<template>
  <div class="space-y-8">
    <section class="text-center">
      <h1 class="neo-title inline-block mb-4">🎯 RE-RENDER OPTIMIZATION</h1>
      <p class="text-xl text-neo-black max-w-3xl mx-auto">
        Learn techniques to prevent unnecessary component re-renders!
      </p>
    </section>

    <!-- theory -->
    <section class="neo-section bg-neo-yellow">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">📚 OPTIMIZATION TECHNIQUES</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

    <!-- v-once demo -->
    <section class="neo-section bg-neo-blue">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">1️⃣ V-ONCE DEMO</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- without v-once -->
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">❌ Without v-once</h3>
          <div class="mb-4">
            <label class="block text-sm font-bold text-neo-black mb-2"
              >Update Counter:</label
            >
            <button @click="counter++" class="neo-button bg-neo-pink text-neo-black">
              Count: {{ counter }}
            </button>
          </div>
          <div class="neo-card bg-neo-yellow p-4">
            <div class="text-sm text-neo-black">
              Updates with each counter click!
            </div>
          </div>
        </div>

        <!-- with v-once -->
       <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">✅ With v-once</h3>
          <div class="mb-4">
            <label class="block text-sm font-bold text-neo-black mb-2"
              >Update Counter:</label
            >
            <button @click="counter++" class="neo-button bg-neo-pink text-neo-black" v-once>
              Count: {{ counter }}
            </button>
          </div>
          <div class="neo-card bg-neo-yellow p-4">
            <div class="text-sm text-neo-black">
              This will not update on counter clicks!
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- v-memo demo -->
    <section class="neo-section bg-neo-green">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">🧠 V-MEMO DEMO</h2>

      <div class="space-y-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">Control Panel</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-bold text-neo-black mb-2">Memo Dependency:</label>
              <input 
                v-model="memoText"
                class="neo-button bg-neo-blue text-neo-black w-full p-2" 
                placeholder="Change this text"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-neo-black mb-2">Non-dependency:</label>
              <button
                @click="nonDependency++"
                class="neo-button bg-neo-purple text-neo-black w-full"
              >
                Click me: {{ nonDependency }}
              </button>
            </div>
            <div>
              <label class="block text-sm font-bold text-neo-black mb-2">Compare Renders:</label>
              <div class="text-sm font-bold text-neo-black">
                Standard: {{ standardRenderCount }}<br>
                Optimized: {{ memoRenderCount }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- without v-memo -->
          <div class="neo-card bg-neo-white">
            <h3 class="text-lg font-bold text-neo-black mb-4">❌ Without v-memo</h3>
            <div class="neo-card bg-neo-pink p-4 text-neo-black">
              <div @vue:render="standardRenderCount++">
                <p class="text-lg font-bold">Text: {{ memoText }}</p>
                <p class="mt-2">Non-dependency: {{ nonDependency }}</p>
                <p class="mt-4 text-sm">This renders on EVERY state change</p>
              </div>
            </div>
            <div class="text-sm text-neo-black mt-2">
              🔥 Re-renders when ANY reactive value changes
            </div>
          </div>

          <!-- with v-memo -->
          <div class="neo-card bg-neo-white">
            <h3 class="text-lg font-bold text-neo-black mb-4">✅ With v-memo</h3>
            <div class="neo-card bg-neo-green p-4 text-neo-black">
              <div v-memo="[memoText]" @vue:render="memoRenderCount++">
                <p class="text-lg font-bold">Text: {{ memoText }}</p>
                <p class="mt-2">Non-dependency: {{ nonDependency }}</p>
                <p class="mt-4 text-sm">This only renders when text changes</p>
              </div>
            </div>
            <div class="text-sm text-neo-black mt-2">
              ✅ Only re-renders when memoText changes
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- v-show vs v-if demo -->
    <section class="neo-section bg-neo-purple">
      <h2 class="text-2xl font-bold mb-6 text-neo-black">👁️ V-SHOW vs V-IF DEMO</h2>

      <div class="space-y-6">
        <div class="neo-card bg-neo-white">
          <h3 class="text-lg font-bold text-neo-black mb-4">Toggle Controls</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              @click="showVIf = !showVIf"
              class="neo-button text-neo-black"
              :class="showVIf ? 'bg-neo-green' : 'bg-neo-pink'"
            >
              v-if: {{ showVIf ? "SHOWN" : "HIDDEN" }}
            </button>
            <button
              @click="showVShow = !showVShow"
              class="neo-button text-neo-black"
              :class="showVShow ? 'bg-neo-green' : 'bg-neo-pink'"
            >
              v-show: {{ showVShow ? "SHOWN" : "HIDDEN" }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- v-if demo -->
          <div class="neo-card bg-neo-white">
            <h3 class="text-lg font-bold text-neo-black mb-4">🔄 Using v-if</h3>
            <div class="neo-card bg-neo-yellow p-4 min-h-[200px]">
              <div v-if="showVIf">
                <MountUnmount
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

          <!-- v-show demo -->
          <div class="neo-card bg-neo-white">
            <h3 class="text-lg font-bold text-neo-black mb-4">👁️ Using v-show</h3>
            <div class="neo-card bg-neo-blue text-neo-black p-4 min-h-[200px]">
              <div v-show="showVShow">
                <MountUnmount title="v-show Component" @mount="vShowMountCount++" />
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
