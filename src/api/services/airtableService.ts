import axios, { AxiosResponse } from "axios";

import api from "../config/axiosInstance";

interface Person {
  id: number; 
  country: string;
  gender: string;
  offer: string;
}

interface BlogPost {
  id: number; 
  title: string;
  content: string;
}

interface Prompt {
  id: number;
  text: string;
}

interface FileResponse {
  id: number; 
  filename: string;
}

// Define API functions
export async function getAllRecords(): Promise<Person[]> {
  try {
    const response: AxiosResponse<Person[]> = await api.get('/persons');
    return response.data;
  } catch (error) {
    console.error('Error fetching all records:', error);
    throw error;
  }
}

export async function createUser({ country, gender, offer }: Omit<Person, 'id'>): Promise<Person> {
  try {
    const response: AxiosResponse<Person> = await api.post('/persons', { country, gender, offer });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getRecordById(id: number | string): Promise<Person> {
  try {
    const response: AxiosResponse<Person> = await api.get(`/persons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching record by ID:', error);
    throw error;
  }
}

export async function updateRecord(id: number | string, data: Partial<Person>, prompt: string): Promise<Person> {
  try {
    const response: AxiosResponse<Person> = await api.put(`/persons/${id}`, { data, prompt });
    return response.data;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
}

export async function deleteRecord(id: number | string): Promise<void> {
  try {
    await api.delete(`/persons/${id}`);
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
}

export async function deleteUser(id: number | string): Promise<void> {
  try {
    await api.delete(`/users/profile/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function uploadFile(id: number | string, data: FormData): Promise<FileResponse> {
  try {
    const response: AxiosResponse<FileResponse> = await api.post(`/files/profile/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function uploadProfileFile(data: FormData, id?: number | string): Promise<FileResponse> {
  try {
    const response: AxiosResponse<FileResponse> = id
      ? await api.post(`/files/user/${id}`, data)
      : await api.post(`/files/user`, data);
    return response.data;
  } catch (error) {
    console.error('Error uploading profile file:', error);
    throw error;
  }
}

export async function downloadFile(id: number | string, filename: string): Promise<void> {
  try {
    const response: AxiosResponse<Blob> = await api.get(`/files/download/${id}`, {
      responseType: 'blob', // Note: changed 'header' to 'responseType'
    });
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.target = '_blank';
    link.download = `${filename}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLists(): Promise<any> {
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = await api.get(`/cos/lists`);
    return response.data;
  } catch (error) {
    console.error('Error getting lists:', error);
    throw error;
  }
}

export async function uploadBlogPostData(data: BlogPost): Promise<BlogPost> {
  try {
    const response: AxiosResponse<BlogPost> = await api.post(`/cos/blogpost`, data);
    return response.data;
  } catch (error) {
    console.error('Error uploading blog post data:', error);
    throw error;
  }
}

export async function updateBlogPostData(id: number | string, data: Partial<BlogPost>): Promise<BlogPost> {
  try {
    const response: AxiosResponse<BlogPost> = await api.put(`/cos/blogpost/${id}`, { data });
    return response.data;
  } catch (error) {
    console.error('Error updating blog post data:', error);
    throw error;
  }
}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContent(id: number | string): Promise<any> { 
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = await api.get(`/cos/content/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting content:', error);
    throw error;
  }
}


 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getResearch(id: number | string): Promise<any> { 
  const source = axios.CancelToken.source();
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = await api.post(`/cos/research/${id}`, {}, { cancelToken: source.token });
    return response.data;
  } catch (error) {
    console.error('Error getting research:', error);
    throw error;
  }
}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getOutline(id: number | string): Promise<any> {
  const source = axios.CancelToken.source();
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = await api.post(`/cos/outline/${id}`, {}, { cancelToken: source.token });
    return response.data;
  } catch (error) {
    console.error('Error getting outline:', error);
    throw error;
  }
}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getArticle(id: number | string): Promise<any> { 
  const source = axios.CancelToken.source();
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = await api.post(`/cos/article/${id}`, {}, { cancelToken: source.token });
    return response.data;
  } catch (error) {
    console.error('Error getting article:', error);
    throw error;
  }
}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getThumbnail(id: number | string): Promise<any> { 
  const source = axios.CancelToken.source();
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = await api.post(`/cos/thumbnail/${id}`, {}, { cancelToken: source.token });
    return response.data;
  } catch (error) {
    console.error('Error getting thumbnail:', error);
    throw error;
  }
}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getArticles(): Promise<any[]> { 
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any[]> = await api.get(`/cos/articles`);
    return response.data;
  } catch (error) {
    console.error('Error getting articles:', error);
    throw error;
  }
}

export async function deleteArticle(id: number | string): Promise<void> {
  try {
    await api.delete(`/cos/articles/${id}`);
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
}

export async function getPrompts(): Promise<Prompt[]> {
  try {
    const response: AxiosResponse<Prompt[]> = await api.get(`/cos/prompts`);
    return response.data;
  } catch (error) {
    console.error('Error getting prompts:', error);
    throw error;
  }
}

export async function updatePrompt(id: number | string, data: Partial<Prompt>): Promise<Prompt> {
  try {
    const response: AxiosResponse<Prompt> = await api.put(`/cos/prompts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating prompt:', error);
    throw error;
  }
}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getImages(): Promise<any[]> { 
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any[]> = await api.get(`/cos/images`);
    return response.data;
  } catch (error) {
    console.error('Error getting images:', error);
    throw error;
  }
}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUsers(): Promise<any[]> { 
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any[]> = await api.get(`/users`);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUser(id: number | string): Promise<any> { 
  try {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = await api.get(`/users/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}