import React, { Component } from 'react'

const CurrentUserContext = React.createContext()

export class CurrentUserProvider extends Component {
  state = {
    user: null,
    processing: false
  }

  getUser = () => {
    window.FB.api('/me', user => {
      this.setState({user, processing: false, redirecting: true})
    })
  }

  login = () => {
    this.setState({processing: true})
    window.FB.getLoginStatus(response => {
      if(response.status === 'connected') {
        this.getUser()
      } else {
        window.FB.login( user => {
          this.getUser()
        })
      }
    })
  }

  logout = () => this.setState({user: null})

  render() {
    const { children } = this.props;

    return (
      <CurrentUserContext.Provider
        value={{
          login: this.login,
          logout: this.logout,
          user: this.state.user
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    );
  }
}

export const CurrentUserConsumer = CurrentUserContext.Consumer
