import axios from 'axios'

export type HttpMethods =
  | 'head'
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'options'
  | 'delete'

export const instance = axios.create({ baseURL: '/api' })
