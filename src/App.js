import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools'
import Home from './components/Home';
import { AllUsers } from './components/AllUsers';
import { SingleUser } from './components/SingleUser';
import { UserPosts } from './components/UserPosts';
import { AllPosts } from './components/AllPosts';
import { SinglePost } from './components/SinglePost';
import  Register from './components/Register';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';
import ShowAllUsers from './components/ShowAllUsers';
import SearchUser from './components/SearchUser';
import ShowAllPosts from './components/ShowAllposts';
import ShowUserPosts from './components/ShowUserPost';
import Login from './components/Login';
import CreateNewPost from './components/CreateNewPost';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import UserContextProvider from './contexts/UserContext';
import FollowingList from './components/FollowingList';
import FollowersList from './components/FollowersList';

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path='/loginuser' element={<Login />} />
      <Route path='/register' element={<Register />}/> 
      <Route path='/users'>
          <Route index element={<AllUsers />} />
          <Route path=':userId'>
            <Route index element={<SingleUser /> } />
            <Route path='createnewpost' element={<CreateNewPost />} />
            <Route path='update' element={<UpdateUser />} />
            <Route path='delete' element={<DeleteUser />} />
            <Route path='search' element={<SearchUser />} />
          <Route path='home' element={<ShowAllPosts />} />
          <Route path='homepage' element={<Feed />}>   
          </Route>

          <Route path='posts' element={<ShowUserPosts />} />
          <Route path='createpost' element={<CreateNewPost />} />
            {/* <Route path='/posts' element={<UserPosts />}/> */}
          </Route>
      </Route>
      <Route path='/posts'>
        <Route index element={<AllPosts />} />
        <Route path=':postId' element={<SinglePost />}/>
      </Route>
      {/* <Route path='/login' element={<UserPosts />} />
      <Route path='/update' element={<UpdateUser />} />
      <Route path='/delete' element={<DeleteUser />} />
      <Route path='/showusers' element={<ShowAllUsers />} />
      <Route path='/search' element={<SearchUser />} />
      <Route path='/showposts' element={<ShowAllPosts />} /> */}
      <Route path='/following' element={<FollowingList />} />
      <Route path='/followers' element={<FollowersList />} />
      
    </Route>
  )
)

function App() {
  return (
    <UserContextProvider>
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router}>
      </RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
