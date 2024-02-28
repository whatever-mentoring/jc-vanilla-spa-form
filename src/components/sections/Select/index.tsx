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

const Select: Component<Props> = ({
  questionId,
  type,
  title,
  data,
  inputData,
  onInput,
}) => {
  const handleChange = (e: InputEvent) => {
    const value = (e.target as HTMLSelectElement).value

    onInput(type, questionId, [value])
  }

  return (
    inputData && (
      <Card hasError={inputData.hasError}>
        <h3 className={commonStyles.title}>
          {title} <span className={commonStyles.asterisk}>*</span>
        </h3>
        <div className={commonStyles.inputContainer}>
          <select
            className={commonStyles.select}
            name={questionId}
            onchange={handleChange}
          >
            {data?.map((v) => {
              return <option value={v}>{v}</option>
            })}
          </select>
          {inputData.hasError && <Error />}
        </div>
      </Card>
    )
  )
}

export default Select
