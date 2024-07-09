import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const gologin = (e) => {
    e.preventDefault()
    navigate('/loginuser')
  }

  const goregister = (e) => {
    e.preventDefault()
    navigate('/register')
  }


  return (
    <div className='socials-home'>
      <h2 className='socials-title'>Come and find your people</h2>
      <p className='socials-text'>Here you can share your thoughts with like minded people</p>
      <button className='login-home' onClick={gologin}>Log in</button>
      <p className='register-home-text'>Hasn't Registered Yet?</p>
      <button className='register-home' onClick={goregister}>Register</button>
    </div>
  )
}

export default Home