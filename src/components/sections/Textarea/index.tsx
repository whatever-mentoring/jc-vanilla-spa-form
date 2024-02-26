import { Component } from '@/libs/jsx/jsx-runtime'
import { DefaultProps } from '@/libs/vtu/types'
import { IQuestion, QuestionType } from '@/mocks/data/Survey'

import Card from '@/components/Card'
import commonStyles from '../styles.module.css'
import styles from './styles.module.css'
import Error from '@/components/Error'

interface Props extends IQuestion, DefaultProps {
  inputData: {
    value: string[]
    hasError: boolean
  }
  onInput: (type: QuestionType, id: string, val: string[]) => void
}

const Textarea: Component<Props> = ({
  questionId,
  type,
  title,
  inputData,
  required,
  onInput,
}) => {
  const handleInput = (e: InputEvent) => {
    const value = (e.target as HTMLTextAreaElement).value ?? ''
    onInput(type, questionId, [value])
  }

  const handleBlur = (e: Event) => {
    const value = (e.target as HTMLTextAreaElement).value ?? ''
    onInput(type, questionId, [value])
  }

  return (
    inputData && (
      <Card hasError={inputData.hasError}>
        <h3 className={commonStyles.title}>
          {title}
          {required && <span className={commonStyles.asterisk}>*</span>}
        </h3>
        <div>
          <textarea
            placeholder="내 답변"
            className={styles.textArea}
            oninput={handleInput}
            onblur={handleBlur}
          >
            {inputData?.value[0]}
          </textarea>
          <div
            className={`${styles.bottomLine} ${
              inputData.hasError ? styles.error : ''
            }`}
          />
          {inputData.hasError && <Error />}
        </div>
      </Card>
    )
  )
}

export default Textarea
