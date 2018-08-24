import React, { Component } from 'react';

class ToDoItem extends Component {
  static defaultProps = {
    done: false
  }

  state = {
    done: this.props.done
  }

  toggleDone = () => {
    this.setState({done: !this.state.done})
  }

  render() {
    const { text } = this.props

    return(
      <div onClick={this.toggleDone} className={this.state.done ? 'doneTodo' : ''}>
        <p>{text}</p>
      </div>
    )
  }
}

export default ToDoItem
