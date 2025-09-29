import api from "../utils/api";

export const getPerfumes = () => api.get("/perfumes");
export const createPerfume = (payload: any) => api.post("/perfumes", payload);
export const getPerfumeById = (id: number) => api.get(`/perfumes/${id}`);
export const updatePerfume = (id: number, data: any) => api.patch(`/perfumes/${id}`, data);
export const deletePerfume = (id: number) => api.delete(`/perfumes/${id}`)

export const uploadPerfumeImages = (perfumeId: number, files: FileList) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  return api.post(`/perfumes-images/upload/${perfumeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
