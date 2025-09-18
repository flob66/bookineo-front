export const saveUser = (user, remember = false) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {

  let data = sessionStorage.getItem("user");
  if (!data) data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const clearUser = () => {
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");
};