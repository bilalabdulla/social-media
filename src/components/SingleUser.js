import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSingleUser } from '../hooks/useSingleUser'
import axios from 'axios'
import ShowSingleUserPost from '../hooks/ShowSingleUserPost'
import { UserContext } from '../contexts/UserContext'

export const SingleUser = () => {
    
    const { followers , dispatch } = useContext(UserContext)

    const { userId } = useParams()
    const { isLoading, data, isError, error } = useSingleUser(userId)
    const navigate = useNavigate()

    const localData = localStorage.getItem('users')
    const localDatas = JSON.parse(localData)

    const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://gorest.co.in/public/v2/users/${userId}/posts`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
            }
          }
        );
        setPosts(response.data);
        console.log('user:', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchPosts();
  }, [])

    if (isLoading) {
        return <h2>We are loading</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }

    const handleFollow = (e) => {
      e.preventDefault()
      dispatch({
        type: 'ADD_FOLLOWER', follower: {
          name: data?.data?.name,
          email: data?.data?.email,
          id: data?.data?.id,
          following: true
        }
      })
      alert('followed user')
    }

  return (
    <div>
      <div className='user-profile'>
      <h2 className='profile-head'>User Details</h2>
        <div className='user-info'>
        <h2 className='profile-title'>Name: {data?.data?.name}</h2> 
        <p className='profile-email'> Email: {data?.data?.email}</p>
        <p className='profile-gender'>Gender: {data?.data?.gender}</p>
        </div>

        <div className={(userId == localDatas.id) ? "follow-list" : "view"}>
              <Link className='follows' to={'/following'}>Following</Link>
              <Link className='follows' to={'/followers'}>Followers</Link>
            </div>
        <div className='-change-profile-div'> 
          <button onClick={() => navigate('update')}
           className={(userId == localDatas.id) ? 'change-profile-btn' : 'view'}>Update your profile</button>
           <button className={(userId != localDatas.id) ? 'change-profile-btn' : 'view'}
           onClick={handleFollow}>
              follow
           </button>
            </div>
        </div>
        <div className='profile-posts'>
          <h2 className='profile-post-title'>All User Posts</h2>
      {
        posts.map((post) => {
          return <ShowSingleUserPost key={post.id}
          title={post.title} body={post.body}
          localUser = {localDatas.id} id = {post.id}
          userid={userId}
          />
        })
      }
      </div>
    </div>
  )
}

