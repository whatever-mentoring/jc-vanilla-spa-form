import { HttpMethods, instance } from '@/libs/axios'
import { useEffect, useState } from '@/libs/vtu'
import { AxiosRequestConfig } from 'axios'

export const useAPI = <T>(
  method: HttpMethods,
  url: string,
  options?: AxiosRequestConfig,
) => {
  const [data, setData] = useState<T>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    instance<T>({ method, url, ...options })
      .then((response) => {
        if (response.status >= 400) {
          setIsError(true)
          return
        }
        setData(response.data)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [url, options])

  return { data, isError }
}
