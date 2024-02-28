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

const CheckBox: Component<Props> = ({
  questionId,
  type,
  title,
  data,
  inputData,
  onInput,
}) => {
  const handleChange = (e: InputEvent) => {
    const { value, checked } = e.target as HTMLInputElement
    let nextData: string[]
    if (checked) {
      nextData = [...inputData.value, value]
    } else {
      nextData = inputData.value.filter((v) => v !== value)
    }

    onInput(type, questionId, nextData)
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
                  type="checkbox"
                  name={`${questionId}_checkbox`}
                  id={`${questionId}_checkbox_${i}`}
                  checked={inputData.value.includes(v)}
                  onchange={handleChange}
                  value={v}
                />
                <label for={`${questionId}_checkbox_${i}`}>{data[i]}</label>
              </div>
            )
          })}
          {inputData.hasError && <Error />}
        </div>
      </Card>
    )
  )
}

export default CheckBox
