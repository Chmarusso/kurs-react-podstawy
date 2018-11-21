import React, { useContext } from 'react'
import { CurrentUserContext } from '../../context/CurrentUser.context'

const Navbar = () => {
  const { user, logout } = useContext(CurrentUserContext)

  return (
    <div>
      {user
        ? <div>
            Hello, {user.name}!
            <button onClick={logout}>Logout</button>
          </div>
        : 'Please login...'}
    </div>
  )
}

export default Navbar
