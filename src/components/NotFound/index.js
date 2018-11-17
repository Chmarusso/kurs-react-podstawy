import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

export const NotFound = ({location}) => {
  const [counter, setCounter] = useState(10)
  const countdown = () => setCounter(counter - 1)

  useEffect(() => {
    const id = setTimeout(countdown, 1000)
    return () => clearTimeout(id)
  }, [counter])

  return(
    <div>
      <p>No match for <code>{location.pathname}</code></p>
      <p>Redirect to homepage in {counter} seconds...</p>
      {counter === 0 && <Redirect to='/' />}
    </div>
  )
}

export default NotFound
