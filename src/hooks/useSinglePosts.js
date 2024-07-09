import { useMutation, useQuery } from "react-query"
import { request } from "../utils/axios.utils"



const fetchSinglePost = (postId) => {
    return request({ url: `/posts/${postId}`})
}

export const useSinglePost = (postId) => {
    return useQuery(['single-post', postId], () => fetchSinglePost(postId))
}

const fetchPostComment = (postId) => {
    return request({ url: `/posts/${postId}/comments`})
}

export const usePostComments = (postId) => {
    return useQuery(['post-comment', postId], () => fetchPostComment(postId))
}

const addPost = (submitData) => {
    return request({ url: `/posts/6940244/comments`, method: 'post', data: submitData})
}

export const useAddUserPost = () => {
    return useMutation(addPost)
}
