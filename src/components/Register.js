import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    email: '',
    status: 'active'
  });

  const navigate = useNavigate()

  const localData = localStorage.getItem('users')
  const localDatas = JSON.parse(localData)

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (localDatas && localDatas.isLoggedIn) {
      setUserData({...userData,
         name: '', email: '', gender:''}
        )
      return alert('You are already logged in')

  } else {

    try {
      const response = await axios.post(
        'https://gorest.co.in/public/v2/users',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
          }
        }
      );
      console.log('User created:', response.data);
      let newLocalData = {
        name: userData.name,
        email: userData.email,
        id: response?.data?.id,
        isLoggedIn: true
          }
      localStorage.setItem('users', JSON.stringify(newLocalData))

      navigate(`../users/${response.data.id}/homepage`)

    } catch (error) {
      console.error('Error creating user:', error);
    }
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
    <div className='login-container'>
    
    <form onSubmit={handleSubmit} className='login-form'>
    <h2 className='register-title'>Register</h2>
      <div className='input-group'>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={userData.name}
        onChange={handleChange}
      />
      </div>

      <div className='input-group'>  
      <label htmlFor="gender">Gender:</label>
      <input
        type="text"
        id="gender"
        name="gender"
        value={userData.gender}
        onChange={handleChange}
      />
      </div>

      <div className='input-group'>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
      />
      </div>

      {/* <div className='input-group'>  
      <label htmlFor="status">Status:</label>
      <input
        type="text"
        id="status"
        name="status"
        value={userData.status}
        onChange={handleChange}
      />
      </div> */}

      <button type="submit" className='register-btn'>Register Now</button>
    </form>
    </div>
  );
};

export default Register;
