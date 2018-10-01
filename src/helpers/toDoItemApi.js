import { toDoItemsApiUrl } from './routes'
import * as api from './api'

export const getAll = () =>
  api.get(toDoItemsApiUrl())

export const get = (id) =>
  api.get(toDoItemsApiUrl(id))

export const update = (id, params) =>
  api.put(toDoItemsApiUrl(id), { todo_item: { ...params } })

export const create = (params) =>
  api.post(toDoItemsApiUrl(), { todo_item: { ...params } })

export const destroy = (id) =>
  api.destroy(toDoItemsApiUrl(id))
