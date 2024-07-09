import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateComment = (props) => {

    const postId = props.postId

    const localData = localStorage.getItem('users')
    const localDatas = JSON.parse(localData)

  const [commentData, setCommentData] = useState({
    name: localDatas.name,
    email: localDatas.email,
    body: '',
  });

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://gorest.co.in/public/v2/posts/${postId}/comments`,
        commentData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
          }
        }
      );
      console.log('User created:', response.data);
      navigate(-1)
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className='comment-form'>
      <textarea 
        className='comment-area'
        type="text"
        id="comment-body"
        name="body"
        value={commentData.body}
        onChange={handleChange}
      />
      <button type="submit" className='comment-btn'>post comment</button>
    </form>
  );
};

export default CreateComment;
