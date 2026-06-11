<script setup>
defineProps({
  links: { type: Array, required: true },
  isOpen: { type: Boolean, default: false },
})

defineEmits(['toggle-menu', 'navigate'])
</script>

<template>
  <nav id="nav">
    <div class="nav-container">
      <a href="#top" class="logo" aria-label="Přejít na začátek">
        <img src="/img/logo.svg" alt="RJ Logo" width="32" height="32" />
      </a>

      <button
        class="menu-toggle"
        id="menuToggle"
        :class="{ active: isOpen }"
        aria-label="Otevřít menu"
        :aria-expanded="isOpen ? 'true' : 'false'"
        @click="$emit('toggle-menu')"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="nav-links" id="navLinks" :class="{ active: isOpen }">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" @click="$emit('navigate')">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
