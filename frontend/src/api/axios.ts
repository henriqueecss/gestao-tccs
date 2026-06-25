import axios from 'axios';

// Configura o Axios para apontar para o servidor do Django com o prefixo /api
// Sem forçar o Content-Type, para permitir o envio de arquivos PDF nativamente
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
});

export default api;