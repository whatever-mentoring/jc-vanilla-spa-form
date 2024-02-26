import { http, HttpResponse } from 'msw'
import { SURVEY_DATA } from './data/Survey'

export const handlers = [
  http.get('/api/survey', () => {
    const { title, startId } = SURVEY_DATA
    return HttpResponse.json({ title, startId })
  }),
  http.get('/api/survey/:id', ({ params }) => {
    const { id } = params
    const survey = SURVEY_DATA.sections[id as string]
    return HttpResponse.json(survey)
  }),
]
