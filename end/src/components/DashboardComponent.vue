<template>
  <div>
    <h3 class="text-xl font-bold text-neo-black mb-4">📊 Dashboard Component</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="neo-card p-4 text-center"
        :class="metric.color"
      >
        <div class="text-2xl font-bold text-neo-black">{{ metric.value }}</div>
        <div class="text-sm text-neo-black">{{ metric.label }}</div>
        <div class="text-xs text-neo-black mt-1">{{ metric.change }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="neo-card bg-neo-white">
        <h4 class="text-lg font-bold text-neo-black mb-4">📈 Recent Activity</h4>
        <div class="space-y-2">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center space-x-3 p-2 border-2 border-neo-black"
            :class="activity.bgColor"
          >
            <div class="text-xl">{{ activity.icon }}</div>
            <div class="flex-1">
              <div class="font-bold text-sm text-neo-black">{{ activity.title }}</div>
              <div class="text-xs text-neo-black">{{ activity.time }}</div>
            </div>
            <div class="text-sm font-bold text-neo-black">{{ activity.value }}</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="neo-card bg-neo-white">
        <h4 class="text-lg font-bold text-neo-black mb-4">⚡ Quick Actions</h4>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="action in quickActions"
            :key="action.label"
            @click="executeAction(action.action)"
            class="neo-button text-neo-white text-sm p-3"
            :class="action.color"
          >
            <div class="text-xl mb-1">{{ action.icon }}</div>
            {{ action.label }}
          </button>
        </div>

        <div v-if="lastAction" class="mt-4 p-3 bg-neo-yellow border-2 border-neo-black">
          <div class="text-sm font-bold text-neo-black">Last Action:</div>
          <div class="text-xs text-neo-black">{{ lastAction }}</div>
        </div>
      </div>
    </div>

    <!-- Real-time Updates -->
    <div class="mt-6 neo-card bg-neo-purple text-neo-white">
      <div class="flex justify-between items-center">
        <h4 class="text-lg font-bold">🔄 Real-time Updates</h4>
        <div class="text-sm">Updated: {{ lastUpdated }}</div>
      </div>
      <div class="mt-2 text-sm">
        Dashboard refreshed {{ updateCount }} times since component loaded
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["loaded"]);

const metrics = ref([
  { label: "Total Users", value: "12,847", change: "+5.2%", color: "bg-neo-pink" },
  { label: "Revenue", value: "$89,432", change: "+12.8%", color: "bg-neo-blue" },
  { label: "Conversion", value: "3.4%", change: "-0.3%", color: "bg-neo-yellow" },
  { label: "Performance", value: "98.2%", change: "+1.1%", color: "bg-neo-green" },
]);

const recentActivity = ref([
  {
    id: 1,
    icon: "👤",
    title: "New User Registration",
    time: "2 min ago",
    value: "+1",
    bgColor: "bg-neo-green",
  },
  {
    id: 2,
    icon: "💰",
    title: "Payment Received",
    time: "5 min ago",
    value: "$245",
    bgColor: "bg-neo-blue",
  },
  {
    id: 3,
    icon: "📊",
    title: "Report Generated",
    time: "8 min ago",
    value: "PDF",
    bgColor: "bg-neo-yellow",
  },
  {
    id: 4,
    icon: "🚨",
    title: "System Alert",
    time: "12 min ago",
    value: "Resolved",
    bgColor: "bg-neo-pink",
  },
]);

const quickActions = [
  { label: "Export Data", icon: "📤", action: "export", color: "bg-neo-blue" },
  { label: "Send Report", icon: "📧", action: "report", color: "bg-neo-green" },
  { label: "Update Settings", icon: "⚙️", action: "settings", color: "bg-neo-purple" },
  { label: "Backup Data", icon: "💾", action: "backup", color: "bg-neo-pink" },
];

const lastAction = ref("");
const lastUpdated = ref("");
const updateCount = ref(0);
const updateInterval = ref(null);

const executeAction = (action) => {
  const actions = {
    export: "Data exported successfully",
    report: "Report sent to administrators",
    settings: "Settings updated",
    backup: "Backup created successfully",
  };

  lastAction.value = `${actions[action]} at ${new Date().toLocaleTimeString()}`;
};

const updateDashboard = () => {
  lastUpdated.value = new Date().toLocaleTimeString();
  updateCount.value++;

  // Simulate real-time metric updates
  metrics.value = metrics.value.map((metric) => ({
    ...metric,
    value:
      metric.label === "Total Users"
        ? `${12847 + updateCount.value},${Math.floor(Math.random() * 100)}`
        : metric.value,
  }));
};

onMounted(() => {
  // Simulate loading time
  setTimeout(() => {
    updateDashboard();

    // Set up real-time updates
    updateInterval.value = setInterval(updateDashboard, 3000);

    emit("loaded");
  }, 1000);
});

onUnmounted(() => {
  if (updateInterval.value) {
    clearInterval(updateInterval.value);
  }
});
</script>
