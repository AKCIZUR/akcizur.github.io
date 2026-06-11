<script setup>
import { onMounted, ref, watch } from 'vue'

import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

import { navLinks, aboutItems, services, portfolioItems } from './content/siteContent.js'
import { useSectionMotion } from './composables/useSectionMotion.js'
import { useSmoothScroll } from './composables/useSmoothScroll.js'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(isMenuOpen, (value) => {
  document.body.classList.toggle('menu-open', value)
})

useSmoothScroll()
useSectionMotion()

onMounted(() => {
  document.documentElement.classList.add('motion-ready')
})
</script>

<template>
  <SiteNav
    :links="navLinks"
    :is-open="isMenuOpen"
    @toggle-menu="toggleMenu"
    @navigate="closeMenu"
  />
  <HeroSection />
  <AboutSection :items="aboutItems" />
  <ServicesSection :items="services" />
  <PortfolioSection :items="portfolioItems" />
  <ContactSection />
  <SiteFooter />
</template>
