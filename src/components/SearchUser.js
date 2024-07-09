import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [isSearch, setIsSearch] = useState(false)

  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://gorest.co.in/public/v2/users?name=${searchName}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580' // Replace with your actual token
            }
          }
        );
        setUsers(response.data);
        console.log('Users:', response.data);
        // Handle success or additional logic here
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error or display error message
      }
    };

    

    fetchUsers();
  }, [searchName]); // Empty dependency array ensures effect runs only once on component mount


  const handleClick = (e) => {
    e.preventDefault()
    setIsSearch(true)
  }

  return (
    <div className='search'>
      <h1 className='search-title'>Search Users</h1>
      <input type='text' className='search-bar' value={searchName} name='searchName'
      onChange={(e) => setSearchName(e.target.value)} />
      <button onClick={handleClick} className='search-btn'>Search</button>

      { (searchName !== '')  ? <ul className='search-list'>
        {users.map(user => (
          <li key={user.id} className='search-item'>
            <p className='search-name'>{user.name}</p>
             <p className='search-email'>{user.email}</p>
             <p className='search-status'>{user.status}</p>
          </li>
        ))}
      </ul> : 
      <div className='no-search-text'>No users found</div>} 
    </div>
  );
};

export default SearchUser;
