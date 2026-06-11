// composables/useSectionMotion.js
import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Composable pro sledování viditelnosti sekcí s atributem `data-motion-section`.
 * Když sekce vjede do viewportu, přidá jí třídu `is-visible`.
 * To lze využít pro spouštění CSS animací (fade, slide apod.).
 */
export function useSectionMotion() {
  let observer // instance IntersectionObserver

  onMounted(() => {
    // Vybereme všechny elementy, které chceme sledovat
    const sections = document.querySelectorAll('[data-motion-section]')

    // Vytvoříme observer – callback se spustí při změně průsečíku
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Přidáme/odebereme třídu .is-visible podle toho, zda je sekce viditelná
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        }
      },
      {
        threshold: 0.2,        // sekce se považuje za viditelnou, když je alespoň 20 % vidět
        rootMargin: '0px 0px -12% 0px', // posun spodní hrany viewportu (12 % ode dna)
      },
    )

    // Každou sekci začneme sledovat
    sections.forEach((section) => observer.observe(section))
  })

  // Při odmontování komponenty observer zrušíme (cleanup)
  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })
}