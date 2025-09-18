export const saveUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const data = sessionStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const clearUser = () => {
  sessionStorage.removeItem("user");
};
