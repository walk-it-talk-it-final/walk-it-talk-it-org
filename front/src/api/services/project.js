import api from "../api"

const option = [
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    },
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": localStorage.getItem("token"),
        }
    }
]

export const projectApi = {
    modifyProject: (id, data) => api.put(`Projects/${id}`, data, option[0]),
    deleteProject: (id) => api.delete(`projects/${id}`, option[0]),
}
