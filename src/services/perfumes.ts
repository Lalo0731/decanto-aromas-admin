import api from "../utils/api";

export const createPerfume = (payload: any) => api.post("/perfumes", payload);

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
