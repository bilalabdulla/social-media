import axios from "axios"
import { request } from "../utils/axios.utils"
import { useQuery } from "react-query"


const fetchAllUsers = () => {
    return request({ url: '/users' })
}

export const useAllUsers = (onSuccess, onError) => {
    return useQuery('all-users', fetchAllUsers, {
        onSuccess,
        onError
    })
} 