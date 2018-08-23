import React, { Component } from 'react';

class ToDoList extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <ToDoList title='My stuff' />
      </div>
    );
  }
}

export default App;
