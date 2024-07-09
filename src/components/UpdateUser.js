import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const { userId } = useParams()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    id: userId,
    isLoggedIn: true
  });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `https://gorest.co.in/public/v2/users/${userId}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
          }
        }
      );
      localStorage.setItem('users', JSON.stringify(userData))
      console.log('User updated:', response.data);
      navigate(-1)
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='update-div'>
      <h2 className='update-info-title'>Update your user information</h2>
    <form onSubmit={handleSubmit} className='update-form'>
      <h2 className='update-name'>Enter name:</h2>
      <input
      className='update-name-input'
        type="text"
        id="name"
        name="name"
        value={userData.name}
        onChange={handleChange}
        required
      />

      <h2 className='update-email'>Enter Email: </h2>
      <input
      className='update-email-input'
        type="email"
        id="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <button type="submit" className='update-form-btn'>Update User</button>
    </form>
    </div>
  );
};

export default UpdateUser;
