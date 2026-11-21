<script setup>
defineProps({ modelValue: { type: [Number, String], required: true }, max: { type: Number, required: true } })
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <div class="label">How many</div>
    <div class="row">
      <button
        v-for="n in [10, 20, 'all']"
        :key="n"
        class="chip"
        :class="{ on: modelValue === n }"
        :disabled="n !== 'all' && n > max"
        @click="$emit('update:modelValue', n)"
      >
        {{ n === 'all' ? `All (${max})` : n }}
      </button>
    </div>
  </div>
</template>
