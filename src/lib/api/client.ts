import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.message || "Erro ao processar requisição",
        status: error.response.status,
      });
    }
    if (error.request) {
      return Promise.reject({
        message: "Erro de conexão. Verifique se a API está rodando.",
        status: 0,
      });
    }
    return Promise.reject({
      message: error.message || "Erro desconhecido",
      status: 0,
    });
  }
);
