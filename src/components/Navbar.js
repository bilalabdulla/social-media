import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Navbar() {

    const localData = localStorage.getItem('users')
    const localDatas = JSON.parse(localData)
    const navigate = useNavigate()


  return (
    <div className='root-layout'>
    <div className='navbar'>
        <div className='navbar-left'>
      <h2 className='navbar-title'>Social Media</h2>
      <i class={(localDatas && localDatas.isLoggedIn) ? 
      "fa-solid fa-magnifying-glass search-icon" : 'view'}
      onClick={() => navigate(`/users/${localDatas.id}/search`)}></i>
      </div>
      <div className='navbar-btns'>
        <Link className={localDatas && localDatas.isLoggedIn ? 'home-btn' : 'view'} to={localDatas && `/users/${localDatas.id}/homepage`}> Home</Link>
        <Link className={localDatas && localDatas.isLoggedIn ? 'home-btn' : 'view'} 
        to={localDatas && `/users/${localDatas.id}`}
        >Your Profile</Link>
        <Link className={localDatas && localDatas.isLoggedIn ? 'log-btn' : 'view'} to={localDatas && `/users/${localDatas.id}/delete`}>{ localDatas && localDatas.isLoggedIn ? 'Log out' : 'log in'}</Link>
        </div>
    </div>
      <main>
      <Outlet />
      </main>
    </div>


  )

  
}

export default Navbar
