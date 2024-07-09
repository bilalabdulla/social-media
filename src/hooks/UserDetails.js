import { useNavigate } from "react-router-dom"

const UserDetails = (props) => {
    const navigate = useNavigate('/')

  return ( 
  <li className={
    (props.id == props.userid) ? 'active-name edit-four' : 'active-name'} 
    key={props.id}>
    <button onClick={() => navigate('/')}>{props.name}</button>
    </li>
  )
}

export default UserDetails
