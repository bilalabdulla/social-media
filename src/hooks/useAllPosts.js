import { useQuery } from "react-query"
import { request } from "../utils/axios.utils"


const fetchAllPosts = () => {
    return request({ url: '/posts'})
}

export const useAllPosts = (onSuccess, onError) => {
    return useQuery('all-posts', fetchAllPosts, {
        onSuccess,
        onError
    })
}