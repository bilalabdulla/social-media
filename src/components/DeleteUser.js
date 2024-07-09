import React from 'react';
import axios from 'axios';
import { json, useNavigate, useParams } from 'react-router-dom';

const DeleteUser = () => {
  
  const { userId } = useParams()
  const navigate = useNavigate()

  const localData = localStorage.getItem('users')
  const localDatas = JSON.parse(localData)
  console.log(localDatas)

  const handleLogout = () => {
    localStorage.setItem('users', JSON.stringify({...localDatas, isLoggedIn: false}))
    navigate('/')
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://gorest.co.in/public/v2/users/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
          }
        }
      );
      console.log('User deleted:', response.data);
      localStorage.removeItem('users')
      navigate('/')
      // Handle success or additional logic here
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error or display error message
    }
  };

  return (
    <div className='delete-logout-div'>
      <div className='logout-div'>
          <h2 className='warning-logout'>Are you sure you wanna logout?</h2>
          <div className='logout-btns'>
              <button className='yes' onClick={handleLogout}>Yes, I wanna log out now</button>
              <button className='no' onClick={() => navigate(`/users/${userId}/homepage`)}>No, I would like to go back</button>
          </div>
      </div>
      <div className='delete-div'>
        <h2 className='warning-delete'>Do you wanna delete your account instead?</h2>
        <p className='red-delete'><span>Warning: </span> if you do this, there is no going back... </p>
    <button onClick={handleDelete} className='delete-btn'>Delete User</button>
    </div>
    </div>
  );
};

export default DeleteUser;
