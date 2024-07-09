import React, { createContext, useEffect, useReducer } from 'react'
import { FollowerReducer } from '../reducers/FollowerReducer'

export const UserContext = createContext()

const UserContextProvider = (props) => {

    const [followers, dispatch] = useReducer(FollowerReducer, [], () => {
      const localFollower = localStorage.getItem('followers')
      return localFollower ? JSON.parse(localFollower) : []
    })

    useEffect(() => {
      localStorage.setItem('followers', JSON.stringify(followers))
    }, [followers])


  return (
    <UserContext.Provider value={{followers, dispatch}}>
        { props.children }
    </UserContext.Provider>
  )
}

export default UserContextProvider
