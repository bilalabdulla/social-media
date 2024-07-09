import axios from "axios";
import { useNavigate } from "react-router-dom";



const ShowSingleUserPost = (props) => {

    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
          const response = await axios.delete(
            `https://gorest.co.in/public/v2/posts/${props.id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
              }
            }
          );
          console.log('Post deleted', response.data);
          navigate(-1)
        } catch (error) {
          console.error('Error deleting post', error);
        }
      };

  return (
      <div key={props.id} className='profile-post'>
            <h2 className='posts-title edit-one'>{props.title}</h2>
            <h4 className='posts-body edit-two'>{props.body}</h4>
            <button className={
                (props.userid == props.localUser) ? '' : 'view'}
                onClick={handleDelete}>
              Delete
              </button>
            </div>
  )
}

export default ShowSingleUserPost
