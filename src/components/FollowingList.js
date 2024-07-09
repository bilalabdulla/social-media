import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function FollowingList() {
    const { followers } = useContext(UserContext)
    const localData = localStorage.getItem('followers')
     const localDatas = JSON.parse(localData)
     console.log(localDatas)

  return (
    <div className='following-head'>
        <h2 className='following-title'>List of People you follow</h2>
      {
        localDatas && localDatas.map((follower) => {
            return <div className='following-list'>
                <p className='following-name'>Name: {follower.name}</p>
                <p className='following-email'>Email: {follower.email}</p>
                </div>
        })
      }
    </div>
  )
}

export default FollowingList
