<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <section id="sluzby" class="services" data-motion-section>
    <div class="container">
      <div class="section-label" data-motion="fade">CO NABÍZÍM</div>
      <h2 class="section-title" data-motion="slide-up">SLUŽBY</h2>
      <div class="services-list">
        <div
          v-for="(item, index) in items"
          :key="item.number"
          class="service-item"
          data-motion="slide-left"
          :style="{ '--i': index }"
        >
          <div class="service-number">{{ item.number }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
