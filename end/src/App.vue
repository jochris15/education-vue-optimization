<template>
  <div class="min-h-screen bg-neo-white">
    <!-- Navigation -->
    <nav class="bg-neo-black border-b-8 border-neo-pink p-4">
      <div class="container mx-auto">
        <h1 class="text-3xl font-bold text-neo-white mb-4">🚀 VUE OPTIMIZATION DEMO</h1>
        <div class="flex flex-wrap gap-4">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="neo-button text-sm"
            :class="{ 'bg-neo-yellow text-neo-black': $route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto p-6">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-neo-purple text-neo-white p-6 mt-12 border-t-8 border-neo-black">
      <div class="container mx-auto text-center">
        <p class="text-xl font-bold">Made with ❤️ and Neobrutalism</p>
        <p class="text-sm mt-2">Vue.js Optimization Techniques Demo</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const navLinks = [
  { path: '/', name: 'HOME' },
  { path: '/reactivity', name: 'REACTIVITY' },
  { path: '/debounce-throttle', name: 'DEBOUNCE/THROTTLE' },
  { path: '/re-render', name: 'RE-RENDER' },
  { path: '/lazy-loading', name: 'LAZY LOADING' }
]
</script>
