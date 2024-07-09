import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowSinglePost from './ShowSinglePost';

const ShowAllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://gorest.co.in/public/v2/posts',
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
            }
          }
        );
        setPosts(response.data);
        console.log('posts:', response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className='show-all-posts'>
      <h1 className='all-posts-title'> Posts from People You may know</h1>
      <ul className='all-posts'>
        {posts.map(post => (
          <ShowSinglePost key={post.id} userid = {post.user_id} id = {post.id}
          title={post.title} body={post.body}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShowAllPosts;
