import React, { Component } from 'react';
import ToDoItem from '../../components/ToDoItem'
import NewTodoForm from '../../components/NewTodoForm'
import styled from 'styled-components'
import * as toDoItemApi from '../../helpers/toDoItemApi'
import * as _ from 'ramda'

const Container = styled.div`
  background: #2b2e39;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`

const Header = styled.h1`
  color: #fff;
`

const DestroyButton = styled.button`
  border-radius: 10px;
  background: red;
  padding: 5px;
  color: #fff;
  margin-bottom: 10px;
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
    const response = await toDoItemApi.destroy(id)

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
      <Container>
        <Header>{title}</Header>
        <DestroyButton onClick={this.removeAll}>Remove all</DestroyButton>
        {tasks.map(task =>
          <ToDoItem
            id={task.id}
            key={task.key}
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
      </Container>
    )
  }
}

export default ToDoList
