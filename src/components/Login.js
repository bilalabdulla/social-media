import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    id: '',
    isLoggedIn: false
  });

  const navigate = useNavigate()

  const localData = localStorage.getItem('users')
  const localDatas = JSON.parse(localData)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (localDatas && localDatas.isLoggedIn) {
      setUserData({...userData,
         name: '', email: ''}
        )
      return alert('You are already logged in')

  } else {
    try {
      const response = await axios.get(
        'https://gorest.co.in/public/v2/users',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
          }
        }
      );
      console.log('User logged in:', response.data);

      response.data.map((res) => {
        if (res.email === userData.email && res.name === userData.name){
            setUserData({
              ...userData, isLoggedIn: true
            })
            let localData = {
                name: userData.name,
                email: userData.email,
                id: res.id,
                isLoggedIn: true
            }
            localStorage.setItem('users', JSON.stringify(localData))
            navigate(`/users/${res.id}/homepage`)
        } else {
          
        }
      })
      
    } catch (error) {
      console.error('Error Logging in:', error);
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
        <h2>login</h2>
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
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
      />
      </div>

      <button type="submit" className='login-btn'>Log in</button>
    </form>
    </div>
  );
};

export default Login;
