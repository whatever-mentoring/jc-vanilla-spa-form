import { Survey } from '@/mocks/data/Survey'
import { useAPI } from './useAPI'

const useSurvey = () => {
  const { data } = useAPI<Partial<Survey>>('get', '/survey')
  const { title, id: surveyId, startId } = data ?? {}

  return { title, surveyId, startId }
}

export default useSurvey
