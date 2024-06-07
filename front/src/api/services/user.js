import api from "../api"

const option = 
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }


export const userApi = {
    getUser: (id) => api.get(`users/${id}`),
    modifyUser: (data) => api.patch('users', data, option),
    deleteUser: () => api.delete('users', option),
    followUser: (id) => api.post(`users/follow`, {id}, option),
    unFollowUser: (id) => api.delete(`users/follow`, {...option, data: {id}}),
    getFollowers: (id) => api.get(`/users/followers/${id}`),
    getFollowings: (id) => api.get(`/users/followings/${id}`),
}
