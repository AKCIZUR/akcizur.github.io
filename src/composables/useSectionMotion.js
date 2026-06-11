import { onBeforeUnmount, onMounted } from 'vue'

export function useSectionMotion() {
  let observer

  onMounted(() => {
    const sections = document.querySelectorAll('[data-motion-section]')

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })
}
