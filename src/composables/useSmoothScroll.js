import { onBeforeUnmount, onMounted } from 'vue'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useSmoothScroll() {
  let currentY = 0
  let targetY = 0
  let rafId = 0
  const speed = 0.1
  const wheelMultiplier = 1.05

  const getMaxScroll = () =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

  const stop = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
  }

  const tick = () => {
    currentY += (targetY - currentY) * speed

    if (Math.abs(targetY - currentY) < 0.5) {
      currentY = targetY
      window.scrollTo(0, currentY)
      stop()
      return
    }

    window.scrollTo(0, currentY)
    rafId = requestAnimationFrame(tick)
  }

  const start = () => {
    if (!rafId) rafId = requestAnimationFrame(tick)
  }

  const scrollToY = (y) => {
    targetY = clamp(y, 0, getMaxScroll())
    currentY = window.scrollY
    start()
  }

  const handleWheel = (event) => {
    if (prefersReducedMotion()) return

    const target = event.target
    if (
      target instanceof HTMLElement &&
      target.closest('input, textarea, select, [contenteditable="true"], [data-native-scroll="true"]')
    ) {
      return
    }

    event.preventDefault()
    targetY = clamp(targetY + event.deltaY * wheelMultiplier, 0, getMaxScroll())
    currentY = window.scrollY
    start()
  }

  const handleAnchorClick = (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const link = target.closest('a[href^="#"]')
    if (!link) return

    const href = link.getAttribute('href')
    if (!href || href === '#') return

    const id = href.slice(1)
    const element = document.getElementById(id)
    if (!element) return

    event.preventDefault()

    const navOffset = 88
    const y = element.getBoundingClientRect().top + window.scrollY - navOffset
    scrollToY(y)

    history.pushState(null, '', href)
  }

  const handlePopState = () => {
    const target = document.getElementById(location.hash.slice(1))
    if (!target) return
    const navOffset = 88
    scrollToY(target.getBoundingClientRect().top + window.scrollY - navOffset)
  }

  onMounted(() => {
    currentY = window.scrollY
    targetY = currentY

    window.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('click', handleAnchorClick, true)
    window.addEventListener('popstate', handlePopState)
  })

  onBeforeUnmount(() => {
    stop()
    window.removeEventListener('wheel', handleWheel)
    document.removeEventListener('click', handleAnchorClick, true)
    window.removeEventListener('popstate', handlePopState)
  })

  return {
    scrollToY,
  }
}
