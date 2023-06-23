import { HttpClient } from "@/utils/HttpClient";

export const api = new HttpClient(process.env.API_BASE_URL || 'http://localhost:3001/api/')