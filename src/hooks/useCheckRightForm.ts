import { Router } from '@/libs/router'
import { useEffect, useState } from '@/libs/vtu'
import useSurvey from './useSurvey'

const useCheckRightForm = (pageParams: string[]) => {
  const { title, surveyId, startId } = useSurvey()
  const [id, setId] = useState(pageParams[0])

  useEffect(() => {
    setId(pageParams[0])
  }, [pageParams])

  useEffect(() => {
    if (!id && startId) {
      window.localStorage.setItem(`survey_${surveyId}`, '{}')
      Router.replace(`/survey/${startId}`)
    }
  }, [id, startId])

  return { title, surveyId, id }
}

export default useCheckRightForm
