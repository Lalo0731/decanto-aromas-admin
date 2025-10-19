import api from "../utils/api";

export const createUser = (formData: any) => api.post("/perfumes-users", formData);
export const getUser = () => api.get("/perfumes-users");
export const getUserById = (id: number) => api.get(`/perfumes-users/${id}`);
export const updateUser = (id: number, data: any) => api.patch(`/perfumes-users/${id}`, data);
export const loginUser = (email:string, password:string) => api.post(`/perfumes-users/login`, {email, password});
export const deleteUser = (id: number) => api.delete(`/perfumes-users/${id}`)