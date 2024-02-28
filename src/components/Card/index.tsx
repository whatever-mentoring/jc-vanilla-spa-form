import { Component } from '@/libs/jsx/jsx-runtime'
import styles from './styles.module.css'
import { DefaultProps } from '@/libs/vtu/types'

interface Props extends DefaultProps {
  hasError?: boolean
}

const Card: Component<Props> = ({ children, hasError = false }) => {
  return (
    <div className={`${styles.container} ${hasError ? styles.error : ''}`}>
      {children}
    </div>
  )
}

export default Card
