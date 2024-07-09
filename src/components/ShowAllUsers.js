import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowAllUsers = () => {
  const [users, setUsers] = useState([]);

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
        console.log('Users:', response.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowAllUsers;
