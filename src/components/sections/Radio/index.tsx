import { Component } from '@/libs/jsx/jsx-runtime'
import { DefaultProps } from '@/libs/vtu/types'
import { IQuestion, QuestionType } from '@/mocks/data/Survey'

import commonStyles from '../styles.module.css'
import Card from '@/components/Card'
import Error from '@/components/Error'

interface Props extends IQuestion, DefaultProps {
  inputData: {
    value: string[]
    hasError: boolean
  }
  onInput: (type: QuestionType, id: string, val: string[]) => void
}

const Radio: Component<Props> = ({
  questionId,
  type,
  title,
  data,
  inputData,
  onInput,
}) => {
  const handleChange = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value

    onInput(type, questionId, data?.filter((v) => v === value) ?? [])
  }

  return (
    inputData && (
      <Card hasError={inputData.hasError}>
        <h3 className={commonStyles.title}>
          {title} <span className={commonStyles.asterisk}>*</span>
        </h3>
        <div className={commonStyles.inputContainer}>
          {data?.map((v, i) => {
            return (
              <div className={commonStyles.inputWrapper}>
                <input
                  type="radio"
                  name={`${questionId}_radio`}
                  id={`${questionId}_radio_${i}`}
                  onchange={handleChange}
                  checked={inputData.value.includes(v)}
                  value={v}
                />
                <label for={`${questionId}_radio_${i}`}>{data[i]}</label>
              </div>
            )
          })}
          {inputData.hasError && <Error />}
        </div>
      </Card>
    )
  )
}

export default Radio
