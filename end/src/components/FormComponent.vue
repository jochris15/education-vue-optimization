<template>
  <div>
    <h3 class="text-xl font-bold text-neo-black mb-4">📝 Complex Form Component</h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-bold text-neo-black mb-2">First Name</label>
          <input 
            v-model="formData.firstName"
            class="neo-input w-full"
            placeholder="Enter first name..."
          />
        </div>
        <div>
          <label class="block text-sm font-bold text-neo-black mb-2">Last Name</label>
          <input 
            v-model="formData.lastName"
            class="neo-input w-full"
            placeholder="Enter last name..."
          />
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-bold text-neo-black mb-2">Email</label>
        <input 
          v-model="formData.email"
          type="email"
          class="neo-input w-full"
          placeholder="Enter email address..."
        />
      </div>
      
      <div>
        <label class="block text-sm font-bold text-neo-black mb-2">Category</label>
        <select v-model="formData.category" class="neo-input w-full">
          <option value="">Select category...</option>
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="fullstack">Fullstack Developer</option>
          <option value="designer">UI/UX Designer</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-bold text-neo-black mb-2">Skills</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <label 
            v-for="skill in availableSkills" 
            :key="skill"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <input 
              v-model="formData.skills"
              :value="skill"
              type="checkbox"
              class="neo-checkbox"
            />
            <span class="text-sm text-neo-black">{{ skill }}</span>
          </label>
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-bold text-neo-black mb-2">Bio</label>
        <textarea 
          v-model="formData.bio"
          class="neo-input w-full h-24 resize-none"
          placeholder="Tell us about yourself..."
        ></textarea>
      </div>
      
      <div class="flex space-x-4">
        <button 
          type="submit"
          class="neo-button bg-neo-green text-neo-white"
          :disabled="!isFormValid"
        >
          Submit Form
        </button>
        <button 
          type="button"
          @click="resetForm"
          class="neo-button bg-neo-pink text-neo-white"
        >
          Reset
        </button>
      </div>
    </form>
    
    <div v-if="submissionResult" class="mt-6 neo-card bg-neo-blue text-neo-white">
      <h4 class="font-bold mb-2">Form Submitted Successfully!</h4>
      <pre class="text-xs">{{ JSON.stringify(submissionResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['loaded'])

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  category: '',
  skills: [],
  bio: ''
})

const submissionResult = ref(null)

const availableSkills = [
  'Vue.js', 'React', 'Angular', 'TypeScript',
  'Node.js', 'Python', 'Java', 'CSS',
  'HTML', 'JavaScript', 'PHP', 'Go'
]

const isFormValid = computed(() => {
  return formData.value.firstName && 
         formData.value.lastName && 
         formData.value.email && 
         formData.value.category
})

const handleSubmit = () => {
  if (isFormValid.value) {
    submissionResult.value = {
      ...formData.value,
      submittedAt: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9)
    }
  }
}

const resetForm = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    category: '',
    skills: [],
    bio: ''
  }
  submissionResult.value = null
}

onMounted(() => {
  // Simulate loading time
  setTimeout(() => {
    emit('loaded')
  }, 600)
})
</script>
