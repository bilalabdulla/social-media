import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowUserPosts = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://gorest.co.in/public/v2/users/${userId}/posts`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580' // Replace with your actual token
            }
          }
        );
        setPosts(response.data);
        console.log('posts:', response.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        
      }
    }

    fetchPosts()
  }, [])

  

  return (
    <div>
      <h1>post List</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.body} - {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowUserPosts;