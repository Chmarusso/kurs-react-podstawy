import React, { Component, useReducer, useState, useEffect } from 'react'
import ToDoItem from '../../components/ToDoItem'
import NewTodoForm from '../../components/NewTodoForm'
import styled from 'styled-components'
import * as toDoItemApi from '../../helpers/toDoItemApi'
import * as _ from 'ramda'

const Header = styled.h1`
  color: #fff;
`

const initialState = {
  todos: {},
  todoIds: []
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.todo.id]: action.todo
        },
        todoIds: [...state.todoIds, action.todo.id]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.id]: {
            ...state.todos[action.id],
            done: !state.todos[action.id].done
          }
        }
      }

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.id]: undefined,
        },
        todoIds: state.todoIds.filter(id => id !== action.id)
      }
    default:
      return state
  }
}

const ToDoList = () => {
  const [draft, setDraft] = useState('')
  const [store, dispatch] = useReducer(reducer, initialState)

  useEffect(async () => {
    const todos = await toDoItemApi.getAll()
    todos.map(todo => {
      dispatch({type: 'ADD_TODO', todo})
    })
  }, [])

  const toggleDone = async (id) => {
    const task = store.todos[id]
    await toDoItemApi.update(id, {done: !task.done})
    dispatch({type: 'TOGGLE_TODO', id})
  }

  const addToDo = async () => {
    const todo = await toDoItemApi.create({content: draft})
    dispatch({type: 'ADD_TODO', todo})
  }

  const destroyToDo = async (id) => {
    await toDoItemApi.destroy(id)
    dispatch({type: 'REMOVE_TODO', id})
  }

  console.log(store)

  return (
    <div>
      <Header>My stuff</Header>
      {store.todoIds.map(id =>
        <ToDoItem
          id={id}
          key={id}
          text={store.todos[id].content}
          done={store.todos[id].done}
          destroy={destroyToDo}
          toggleDone={toggleDone}
        />
      )}
      <NewTodoForm
        onSubmit={addToDo}
        onChange={(e) => setDraft(e.target.value)}
        draft={draft} />
    </div>
  )
}

export default ToDoList
