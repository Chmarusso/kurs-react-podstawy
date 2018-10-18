import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { SubmitButton } from '../../helpers/theme'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'

class Login extends Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } }

    return (
      <CurrentUserConsumer>
        {({ user, login, processing }) => (
          <div>
            {user && <Redirect to={from} />}
            <p>You must log in to view the page at {from.pathname}</p>
            {processing
              ? <div>Authenticating...</div>
              : <SubmitButton onClick={login}>Facebook login</SubmitButton>
            }
          </div>
        )}
      </CurrentUserConsumer>
    )
  }
}

export default Login
