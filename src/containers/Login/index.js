import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { SubmitButton } from '../../helpers/theme'

class Login extends Component {
  state = {
    processing: false,
    redirecting: false
  }

  fbLogin = () => {
    this.setState({processing: true})
    window.FB.getLoginStatus(response => {
      if(response.status === 'connected') {
        window.FB.api('/me', user => {
          sessionStorage.setItem('currentUser', user)
          this.setState({processing: false, redirecting: true})
        })
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const { redirecting } = this.state

    if(redirecting) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        {this.state.processing
          ? <div>Authenticating...</div>
          : <SubmitButton onClick={this.fbLogin}>Facebook login</SubmitButton>
        }
      </div>
    )
  }
}

export default Login
