import React, { Component } from 'react';
import ToDoItem from '../../components/ToDoItem'
import NewTodoForm from '../../components/NewTodoForm'
import styled from 'styled-components'
import * as toDoItemApi from '../../helpers/toDoItemApi'
import * as _ from 'ramda'

const Header = styled.h1`
  color: #fff;
`

class ToDoList extends Component {
  componentDidMount = async () => {
    const tasks = await toDoItemApi.getAll()
    this.setState({tasks})
  }

  static defaultProps = {
    tasks: [],
    title: 'My stuff'
  }

  state = {
    tasks: this.props.tasks,
    draft: ''
  }

  updateDraft = event => {
    this.setState({draft: event.target.value})
  }

  addToDo = async () => {
    const { tasks, draft } = this.state
    const task = await toDoItemApi.create({content: draft})

    this.setState({tasks: _.append(task, tasks), draft: ''})
  }

  findById = (id, arr) => {
    const index = _.findIndex(_.propEq('id', id))(arr)
    return { index: index, task: arr[index] }
  }

  destroyToDo = async (id) => {
    const { tasks } = this.state
    await toDoItemApi.destroy(id)

    const { index } = this.findById(id, tasks)

    this.setState({tasks: _.remove(index, 1, tasks)})

  }

  toggleDone = async (id) => {
    const { tasks } = this.state
    const { index, task } = this.findById(id, tasks)
    const response = await toDoItemApi.update(id, {done: !task.done})

    this.setState({tasks: _.update(index, response, tasks)})
  }

  removeAll = () => {
    this.setState({tasks: []})
  }

  render() {
    const { title } = this.props
    const { tasks, draft } = this.state

    return (
      <div>
        <Header>{title}</Header>
        {tasks.map(task =>
          <ToDoItem
            id={task.id}
            key={task.id}
            text={task.content}
            done={task.done}
            destroy={this.destroyToDo}
            toggleDone={this.toggleDone}
          />
        )}
        <NewTodoForm
          onSubmit={this.addToDo}
          onChange={this.updateDraft}
          draft={draft} />
      </div>
    )
  }
}

export default ToDoList
