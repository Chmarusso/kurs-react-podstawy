import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import styled from 'styled-components'
import ToDoList from './containers/ToDoList'
import ToDoEditForm from './containers/ToDoEditForm'
import NotFound from './components/NotFound'
import Login from './containers/Login'
import Navbar from './containers/Navbar'
import {
  CurrentUserProvider,
  CurrentUserConsumer
} from './context/CurrentUser.context'
import './App.css'


const Container = styled.div`
  background: #2b2e39;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      <CurrentUserConsumer>
        {({ user }) => (
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        )}
      </CurrentUserConsumer>
    }
  />
)

class App extends Component {
  render() {
    return (
      <Router>
        <CurrentUserProvider>
          <Container>
            <Navbar/>
            <Switch>
              <Route exact path='/' component={ToDoList}/>
              <PrivateRoute exact path={'/todo_items/:itemId'} component={ToDoEditForm}/>
              <Route exact path='/login' component={Login} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </CurrentUserProvider>
      </Router>
    );
  }
}

export default App;
