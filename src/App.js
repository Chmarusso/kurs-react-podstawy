import React, { Component } from 'react';
import './App.css'
import ToDoItem from './components/ToDoItem'

class ToDoList extends Component {
  state = {
    tasks: this.props.tasks,
    draft: ''
  }

  updateDraft = event => {
    this.setState({draft: event.target.value})
  }

  addToDo = () => {
    const { tasks, draft } = this.state
    const list = tasks
    list.push(draft)
    this.setState({tasks: list, draft: ''})
  }

  render() {
    const { title } = this.props
    const { tasks, draft } = this.state

    return (
      <div>
        <h1>{title}</h1>
        {tasks.map(task => <ToDoItem text={task.text} done={task.done} />)}
        <input type='text' onChange={this.updateDraft} value={draft} />
        <button onClick={this.addToDo}>Add</button>
      </div>
    )
  }
}

class App extends Component {
  myTasks = [
    {text: 'Record a ReactJS video'},
    {done: false, text: 'Go for a walk'}
  ]

  render() {
    return (
      <div>
        <ToDoList title='My stuff' tasks={this.myTasks} />
      </div>
    );
  }
}

export default App;
