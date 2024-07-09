import React, { useEffect, useState } from 'react'
import ShowAllPosts from './ShowAllposts'
import UserDetails from '../hooks/UserDetails'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Feed() {
    
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()
    const { userId } = useParams()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://gorest.co.in/public/v2/users',
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
            }
          }
        );
        setUsers(response.data);
        console.log('Users:', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='feed'>
        <div className='sidebar'>
            <h2 className='active-title'>Active Users</h2>
            <ul>
            {
                users?.map((user) => {
                    if (user.status === 'active') {
                      return <UserDetails
                      key={user.id} name={user.name}
                      id={user.id} userid={userId}
                      />
                    }
                })
            }
            </ul>           
        </div>
        <div className='main-feed'>

      <ShowAllPosts />

      </div>
      <button className='new-post-btn' onClick={() => navigate('../createpost')}>+ Create new post</button>

    </div>
  )
}

export default Feed
