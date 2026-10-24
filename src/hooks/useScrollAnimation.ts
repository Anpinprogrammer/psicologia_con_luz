import { useEffect } from 'react'
import '../styles/animations.css'

/** Navbar scrolls can replay even a section that is already visible. */
export function replayScrollAnimation(id: string) {
  window.dispatchEvent(new CustomEvent('landing:replay', { detail: id }))
}

/** Mark elements with data-animate="focus|left|right|elevate|lift|badge|pop".
 * Optional data-delay is a number in milliseconds. No styles are hidden without JS.
 */
export function useScrollAnimation() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]'))
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!('IntersectionObserver' in window)) return

    const frames = new Map<HTMLElement, number>()
    const visible = new Set<HTMLElement>()
    const reveal = (element: HTMLElement) => {
      if (motion.matches) return
      element.classList.add('is-visible')
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement
        if (entry.isIntersecting) {
          visible.add(element)
          reveal(element)
        } else {
          visible.delete(element)
          element.classList.remove('is-visible')
        }
      })
    }, { threshold: 0, rootMargin: '-6% 0px -4% 0px' })

    elements.forEach(element => {
      const delay = Number(element.dataset.delay ?? 0)
      element.style.setProperty('--reveal-delay', `${Math.min(1200, Math.max(0, delay || 0))}ms`)
      element.classList.add('motion-ready')
      observer.observe(element)
    })

    const replay = (event: Event) => {
      const section = document.getElementById((event as CustomEvent<string>).detail)
      if (!section || motion.matches) return
      elements.filter(element => section === element || section.contains(element)).forEach(element => {
        const pending = frames.get(element)
        if (pending !== undefined) cancelAnimationFrame(pending)
        element.classList.remove('is-visible')
        // Two frames commit the reset before restarting the CSS keyframes.
        frames.set(element, requestAnimationFrame(() => {
          frames.set(element, requestAnimationFrame(() => {
            frames.delete(element)
            if (visible.has(element)) reveal(element)
          }))
        }))
      })
    }
    const onMotionChange = () => {
      elements.forEach(element => {
        element.classList.toggle('motion-ready', !motion.matches)
        element.classList.toggle('is-visible', !motion.matches && visible.has(element))
      })
    }
    onMotionChange()
    motion.addEventListener('change', onMotionChange)
    window.addEventListener('landing:replay', replay)
    return () => {
      observer.disconnect()
      frames.forEach(cancelAnimationFrame)
      motion.removeEventListener('change', onMotionChange)
      window.removeEventListener('landing:replay', replay)
      elements.forEach(element => {
        element.classList.remove('motion-ready', 'is-visible')
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [])
}
