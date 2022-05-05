import axios from 'axios';

axios.defaults.withCredentials = true;

export const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export const getUser = async () => {
  // console.log('getSession I AM HERE BITCH 1111');
  const { data } = await baseAxios.get('/getSession');
  console.log('Session', data);
  return data;
};

export const postAuth = async (user) => {
  const { data } = await baseAxios.post('/auth', {
    email: user.email,
    password: user.password,
    nickname: user.nickname,
    name: user.name,
    id: user.id,
  });

  return data;
};

export const postLogin = async (user) => {
  const { data } = await baseAxios.post('/login', user);
  return data;
};

export const postRecovery = async (values) => {
  const { data } = await baseAxios.post('/recovery', {
    email: values.email,
    newPassword: values.newPassword,
  });
  return data;
};

export const postLogOut = async (id) => {
  const { data } = await baseAxios.post(`/logout?id=${id}`);
  return data;
};

export const getFields = async (gameId) => {
  const { data } = await baseAxios.get(`/fields?id=${gameId}`);
  return data;
};

export const getSteps = async (id, user) => {
  const { data } = await baseAxios.get(`/steps?id=${id}&user=${user}`);
  return data;
};