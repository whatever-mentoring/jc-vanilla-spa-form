import { Component } from '@/libs/jsx/jsx-runtime'
import { Router } from '@/libs/router'
import { useEffect, useState } from '@/libs/vtu'
import { PageProps } from '@/libs/vtu/types'

import styles from './styles.module.css'
import useSurvey from '@/hooks/useSurvey'

const Result: Component<PageProps> = () => {
  const { title, surveyId, startId } = useSurvey()
  const [result, setResult] = useState('result')

  useEffect(() => {
    setResult(window.localStorage.getItem(`survey_${surveyId}`) ?? '')
  }, [surveyId])

  useEffect(() => {
    if (!surveyId) {
      return
    }
    if (!result) {
      Router.replace('/')
      return
    }
  }, [surveyId, result])

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <div className={styles.topBorder}></div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.result}>{result}</p>
        <a className={styles.goToFirst} data-link href={`/survey/${startId}`}>
          처음으로
        </a>
      </div>
    </div>
  )
}

export default Result
