const serverUrl = 'http://localhost:5000'

export const toDoItemsApiUrl = id =>
  id ? `${serverUrl}/todo_items/${id}` : `${serverUrl}/todo_items`
