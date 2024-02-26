import { Component } from '@/libs/jsx/jsx-runtime'
import { PageProps } from '@/libs/vtu/types'

import { useAPI } from '@/hooks/useAPI'
import useCheckRightForm from '@/hooks/useCheckRightForm'
import { QuestionType, Section } from '@/mocks/data/Survey'
import Textarea from '@/components/sections/Textarea'
import { useEffect, useState } from '@/libs/vtu'

import styles from './styles.module.css'
import Radio from '@/components/sections/Radio'
import CheckBox from '@/components/sections/CheckBox'
import Select from '@/components/sections/Select'
import { Router } from '@/libs/router'

interface SurveyValue {
  [key: string]: {
    type: QuestionType
    data?: string[]
    value: string[]
    text?: string
    hasError: boolean
    required: boolean
  }
}

const SurveyPage: Component<PageProps> = ({ pageParams }) => {
  const { title, surveyId, id } = useCheckRightForm(pageParams ?? [])
  const { data: sectionData } = useAPI<Section>('get', `/survey/${id}`)
  const [inputData, setInputData] = useState<SurveyValue>({})

  useEffect(() => {
    if (!sectionData) {
      return
    }
    let existingValues: {
      [id: string]: string[]
    } = {}
    try {
      existingValues = JSON.parse(
        window.localStorage.getItem(`survey_${surveyId}`) ?? '',
      )
    } finally {
      const obj: SurveyValue = {}
      for (const {
        type,
        questionId,
        required,
        data,
      } of sectionData.questions) {
        obj[questionId] = {
          type,
          data,
          value: existingValues[questionId] ?? [],
          required,
          hasError: false,
        }
      }
      setInputData(obj)
    }
  }, [sectionData])

  const handleChange = (type: QuestionType, id: string, val: string[]) => {
    const currentData = inputData[id]

    setInputData({
      ...inputData,
      [id]: {
        ...currentData,
        value: val,
        hasError: currentData.required ? checkHasError(type, val) : false,
      },
    })
  }

  const save = () => {
    const surveyKey = `survey_${surveyId}`
    let survey: {
      [key: string]: string[]
    }
    try {
      survey = JSON.parse(window.localStorage.getItem(surveyKey) ?? '') || {}
    } catch {
      survey = {}
      /* empty */
    }
    Object.entries(inputData).forEach(([key, data]) => {
      survey[key] = data.value
    })
    window.localStorage.setItem(surveyKey, JSON.stringify(survey))
  }

  const goBefore = () => {
    save()
    Router.push(`/survey/${sectionData.beforeId}`)
  }

  const goNext = () => {
    let hasError = false
    for (const id in inputData) {
      const data = inputData[id]
      if (data.required) {
        if (checkHasError(data.type, data.value)) {
          hasError = true
          data.hasError = true
        }
      }
    }
    if (hasError) {
      return
    }
    save()
    Router.push(`/survey/${sectionData.nextId}`)
  }

  const submit = () => {
    save()
    Router.push(`/result`)
  }

  if (!sectionData) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <div className={styles.topBorder}></div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.warning}>* 표시는 필수 질문임</p>
      </div>
      {sectionData.questions.map((data) => {
        switch (data.type) {
          case 'textarea':
            return (
              <Textarea
                {...data}
                inputData={inputData[data.questionId]}
                onInput={handleChange}
              />
            )
          case 'radio':
            return (
              <Radio
                {...data}
                inputData={inputData[data.questionId]}
                onInput={handleChange}
              />
            )
          case 'checkbox':
            return (
              <CheckBox
                {...data}
                inputData={inputData[data.questionId]}
                onInput={handleChange}
              />
            )
          case 'select':
            return (
              <Select
                {...data}
                inputData={inputData[data.questionId]}
                onInput={handleChange}
              />
            )
        }
      })}
      <div className={styles.buttonWrapper}>
        {sectionData.beforeId && (
          <button className={styles.navButton} onclick={goBefore}>
            이전
          </button>
        )}
        {sectionData.nextId && (
          <button className={styles.navButton} onclick={goNext}>
            다음
          </button>
        )}
        {!sectionData.nextId && (
          <button className={styles.submitButton} onclick={submit}>
            제출
          </button>
        )}
      </div>
    </div>
  )
}

export default SurveyPage

const checkHasError = (type: QuestionType, value: string[]): boolean => {
  switch (type) {
    case 'textarea':
      return value[0].length < 1
    case 'checkbox':
    case 'radio':
    case 'select':
      return value.length < 1
  }
}
