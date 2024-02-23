import { Component } from '@/libs/jsx/jsx-runtime'
import { Router } from '@/libs/router'
import { useEffect, useState } from '@/libs/vtu'
import { PageProps } from '@/libs/vtu/types'

const Survey: Component<PageProps> = ({ pageParams }) => {
  const [id] = useState(pageParams?.[0])

  useEffect(() => {
    if (!id) {
      Router.replace(`/`)
    }
  }, [id])
  return <div>{id}</div>
}

export default Survey
