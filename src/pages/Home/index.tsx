import { Component } from '@/libs/jsx/jsx-runtime'
import { useState } from '@/libs/vtu'

const HomePage: Component = () => {
  const [isFirst, setIsFirst] = useState(true)
  const goSecond = () => {
    setIsFirst(false)
  }
  const onReset1 = () => {
    console.log('first reset')
  }

  const onSubmit = (e: Event) => {
    e.preventDefault()
    console.log('submit')
  }
  return (
    <form onsubmit={onSubmit}>
      <div onclick={goSecond}>페이지 이동</div>
      {isFirst ? (
        <button type="reset" onclick={onReset1}>
          리셋
        </button>
      ) : (
        <button type="submit">제출</button>
      )}
    </form>
  )
}

export default HomePage
