import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateNewPost = () => {

    const { userId } = useParams()

  const [userData, setUserData] = useState({
    user_id: userId,
    title: '',
    body: '',
  });

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://gorest.co.in/public/v2/users/${userId}/posts`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
          }
        }
      );
      console.log('User created:', response.data);
      navigate(`../homepage`)
    } catch (error) {
      console.error('Error creating user:', error);
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
    <div className='create-post'>
      <h2 className='create-head'>Post Your Thoughts Here...</h2>
    <form onSubmit={handleSubmit} create-form>
      <h2 className='create-title'>Enter Title:</h2>
      <input className='title-input'
        type="text"
        id="title"
        name="title"
        value={userData.title}
        onChange={handleChange}
      />

      <h2 className='create-body'>Enter Content:</h2>
      <textarea className='body-area'
        type="text"
        id="body"
        name="body"
        value={userData.body}
        onChange={handleChange}
      />

      <button type="submit" className='create-btn'>Create New Post</button>
    </form>
    </div>
  );
};

export default CreateNewPost;
