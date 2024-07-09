import { useMutation, useQuery } from "react-query"
import { request } from "../utils/axios.utils"


const fetchSingleUser = (userId) => {
    return request({ url: `/users/${userId}`})
}

const addPost = (newPost, userId) => {
    return request({ url: `/users/${userId}/posts`, method: 'post', data: newPost})
}

export const useSingleUser = userId => {
    return useQuery(['single-user', userId], () => fetchSingleUser(userId))
}

export const useAddUserPost = () => {
    return useMutation(addPost)
}

