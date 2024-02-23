import { Component } from '@/libs/jsx/jsx-runtime'
import Home from '@/pages/Home'
import Result from '@/pages/Result'
import Survey from '@/pages/Survey'

interface Route {
  path: string
  view: Component
  resolved?: RegExpMatchArray
}

const routes: Route[] = [
  { path: '/', view: Home },
  { path: '/survey/:id', view: Survey },
  { path: '/result', view: Result },
]

export default routes
