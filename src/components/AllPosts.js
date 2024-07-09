import { Link } from "react-router-dom"
import { useAllPosts } from "../hooks/useAllPosts"



export const AllPosts = () => {

    const onSuccess = (data) => {
        console.log('post got', data)
    } 
    const onError = (error) => {
        console.log('no posts', error)
    }

    const {
        isLoading,
        data,
        error,
        isError,
        isFetching,
        fetching} = useAllPosts(onSuccess, onError)

    if (isLoading || isFetching) {
        return <h2>Here we go</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <div>
            <h2>All posts</h2>
            {
                data?.data.map((post) => {
                    return <div key={post.id}>
                        <Link to={`${post.id}`}>{post.id}</Link>
                        </div>
                })
            }
        </div>
    )
}