import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const ShowSinglePost = (props) => {

const [liked, setLiked] = useState(false)
const [like, setLike] = useState(0)

const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'https://gorest.co.in/public/v2/users',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580' // Replace with your actual token
          }
        }
      );
      setUsers(response.data);
      console.log('users:', response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  fetchUsers()
}, [])

const likeHandler = () => {
  setLike(liked ? like-1 : like+1)
  setLiked(!liked)
}

    return (
          <li key={props.id} className='posts-card'>
            {users.map((user) => {
                if (user.id === props.userid) {
                    return  <Link to={`/users/${props.userid}`} className='posts-name'>{user.name}</Link>
                } 
            })}
            <h2 className='posts-title'>{props.title}</h2>
            <h4 className='posts-body'>{props.body}</h4>
            <div className='interaction'>
            <i class={liked ? "fa-solid fa-heart heart-icon" : "fa-regular fa-heart heart-icon"} onClick={likeHandler}>
                <span>{like}</span>
                </i>
            <Link to={`/posts/${props.id}`} className='comment'>Comment</Link>
            </div>
          </li>
    )
}

export default ShowSinglePost