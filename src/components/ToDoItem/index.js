import React, { Component } from 'react';
import styled from 'styled-components'

const Item = styled.div`
  background: #343744;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 7px;
  color: ${props => props.done ? '#1fd84d' : '#c7c8cb'}
  text-decoration: ${props => props.done ? 'line-through' : 'auto'}
`

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
      <Item onClick={this.toggleDone} done={this.state.done}>
        {text}
      </Item>
    )
  }
}

export default ToDoItem
