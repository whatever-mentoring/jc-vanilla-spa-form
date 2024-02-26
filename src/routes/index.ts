import { Component } from '@/libs/jsx/jsx-runtime'
import Home from '@/pages/Home'
import Result from '@/pages/Result'
import SurveyPage from '@/pages/Survey'

interface Route {
  path: string
  view: Component
  resolved?: RegExpMatchArray
}

const routes: Route[] = [
  { path: '/home', view: Home },
  { path: '/', view: SurveyPage },
  { path: '/survey/:id', view: SurveyPage },
  { path: '/result', view: Result },
]

export default routes
