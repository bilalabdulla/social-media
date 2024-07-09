import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
              'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580' // Replace with your actual token
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

  // const [liked, setLiked] = useState(false)
  // const [like, setLike] = useState(0)

  // const likeHandler = () => {
  //   setLike(liked ? like-1 : like+1)
  //   setLiked(!liked)
  // }
  
  return (
    <div className='show-all-posts'>
      <h1 className='all-posts-title'> Posts from People You may know</h1>
      <ul className='all-posts'>
        {posts.map(post => (
          <ShowSinglePost key={post.id} userid = {post.user_id} id = {post.id}
          title={post.title} body={post.body}
          />
          // <li key={post.id} className='posts-card'>
          //   <Link to={`/users/${post.user_id}`} className='posts-name'>User</Link>
          //   <h2 className='posts-title'>{post.title}</h2>
          //   <h4 className='posts-body'>{post.body}</h4>
          //   <div className='interaction'>
          //   <i class={liked ? "fa-regular fa-heart" : "fa-solid fa-heart"} onClick={likeHandler}>{like}</i>
          //   <Link to={`/posts/${post.id}`} className='comment'>Comment</Link>
          //   </div>
          // </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowAllPosts;
