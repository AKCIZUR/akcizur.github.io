<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <section id="portfolio" class="portfolio" data-motion-section>
    <div class="container">
      <div class="section-label" data-motion="fade">VYBRANÉ PROJEKTY</div>
      <h2 class="section-title" data-motion="slide-up">PORTFOLIO</h2>
      <div class="portfolio-grid">
        <div
          v-for="(item, index) in items"
          :key="item.number"
          class="portfolio-item"
          data-motion="scale"
          :style="{ '--i': index }"
        >
          <div class="portfolio-bg"></div>
          <div class="portfolio-content">
            <div class="portfolio-number">{{ item.number }}</div>
            <h3>
              <span v-for="(line, lineIndex) in item.title.split('\n')" :key="`${item.number}-${lineIndex}`">
                {{ line }}<br v-if="lineIndex < item.title.split('\n').length - 1" />
              </span>
            </h3>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
