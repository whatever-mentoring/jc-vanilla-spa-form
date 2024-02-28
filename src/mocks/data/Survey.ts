export type QuestionType = 'textarea' | 'radio' | 'checkbox' | 'select'

interface QuestionData {
  textarea: undefined
  radio: string[]
  checkbox: string[]
  select: string[]
}

export interface IQuestion {
  questionId: string
  title: string
  type: QuestionType
  data: QuestionData[IQuestion['type']]
  required: boolean
}

export interface Section {
  questions: IQuestion[]
  beforeId?: string
  nextId?: string
}

export interface Survey {
  title: string
  id: string
  startId: string
  sections: {
    [id: string]: Section
  }
}

export const SURVEY_DATA: Survey = {
  title: 'Survey',
  id: '1',
  sections: {
    1: {
      questions: [
        {
          questionId: '1_1',
          title: 'radio input 1',
          type: 'radio',
          data: ['radio option 1', 'radio option 2', 'radio option 3'],
          required: true,
        },
        {
          questionId: '1_2',
          title: 'checkbox input 1',
          type: 'checkbox',
          data: ['checkbox option 1', 'checkbox option 2', 'checkbox option 3'],
          required: true,
        },
      ],
      nextId: '2',
    },
    2: {
      questions: [
        {
          questionId: '2_1',
          title: 'select input 1',
          type: 'select',
          data: ['select option 1', 'select option 2', 'select option 3'],
          required: true,
        },
        {
          questionId: '2_2',
          title: 'textarea input 1',
          type: 'textarea',
          data: undefined,
          required: true,
        },
      ],
      beforeId: '1',
    },
  },
  startId: '1',
}
