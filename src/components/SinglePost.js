import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAddUserPost, usePostComments, useSinglePost } from "../hooks/useSinglePosts"
import axios from "axios"
import CreateComment from "./CreateComment"


export const SinglePost = () => {
    const { postId } = useParams()
    const { isLoading, data, error, isError} = useSinglePost(postId)
    const { data: comments } = usePostComments(postId)
    const [users, setUsers] = useState([]);
    const [post, setPost] = useState('')


    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(
              `https://gorest.co.in/public/v2/users/${data?.data.user_id}`,
              {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
                }
              }
            );
            setUsers(response.data);
            console.log('users:', response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchUsers();
      }, [users]);

      useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(
              `https://gorest.co.in/public/v2/posts/${postId}`,
              {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
                }
              }
            );
            setPost(response.data);
            console.log('posts:', response.data);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        fetchPost();
      }, []);

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>Error</h2>
    }

    return (
        <div className="single-post">
            <h2 className="single-post-title">{users.name}</h2>
            <h2 className="posts-title edit-one">{post.title}</h2>
            <h4 className="posts-body edit-three">{post.body}</h4>
            <h2 className="comments-head">All Comments: </h2>
            {
                comments?.data.map((comment) => {
                 return <div key={comment.id} className="comments-text">{comment.body}</div>
                })
            }
            <CreateComment postId={postId}/>
        </div>
    )
}