import axios from "axios";

const client = axios.create({ baseURL: 'https://gorest.co.in/public/v2'})

export const request = ({...options }) => {
    client.defaults.headers.common.Authorization = 'Bearer 003efa7ddb01487dc06c89e0e31577edfe62304ee89ac388fa2a72547e3a1580'
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}