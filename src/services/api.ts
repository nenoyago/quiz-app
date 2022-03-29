import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

export const apiQuiz = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_QUIZ}`,
});
