import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAddUserPost } from '../hooks/useSingleUser'
import axios from 'axios'

export const UserPosts = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { postId } = useParams()

    const { mutate } = useAddUserPost()

    const handleSubmit = async (e) => {
      e.preventDefault()
        const newPost = {title, body: content}
        try {
          const response = await axios.post(
            'https://gorest.co.in/public/v2/users/6940251/posts',
            newPost,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
              }
            }
          );
          console.log('User created:', response.data)
        } catch (error) {
          console.error('Error creating user:', error);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={title} 
      onChange={(e) => setTitle(e.target.value)} required/>
      <textarea type='text' value={content} 
      onChange={(e) => setContent(e.target.value)} required/>
      <button type='submit'>Post</button>
    </form>
  )
}


