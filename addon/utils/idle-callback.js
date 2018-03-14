import { debounce } from '@ember/runloop'

export default function idleCallback(fn, deadline) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(fn, deadline)
  } else {
    debounce(fn, 50, false)
  }
}
