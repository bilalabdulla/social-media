import React from 'react'
import { Link } from 'react-router-dom'
import { useAllUsers } from '../hooks/useAllUserData'

export const AllUsers = () => {

    const onSuccess = (data) => {
        console.log('Loaded successfully ', data?.data)
    }
    const onError = (error) => {
        console.log('failed loading', error)
    }

    const { isLoading, data, isError, error, isFetching, refetch } = useAllUsers(onSuccess, onError)
    
    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    

  return (
    <div className='all-users'>
      <h2 className='search-title'>All users</h2>
      {
        data?.data.map((user) => {
            return <div key={user.id} className='search-item'>
                <Link to={`${user.id}`} >
                <p className='search-name'>{user.name}</p>
                <p className='search-email'>{user.email}</p>
                <p className='search-status'>{user.status}</p>
                </Link>
            </div>
        }) 
      }
    </div>
  )
}