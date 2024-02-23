import route, { Router } from '@/libs/router'

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const $a = (e.target as HTMLElement).closest('a')
    if ($a?.matches('[data-link]')) {
      e.preventDefault()
      Router.replace($a.href)
    }
  })

  window.addEventListener('popstate', route)

  route()
})
