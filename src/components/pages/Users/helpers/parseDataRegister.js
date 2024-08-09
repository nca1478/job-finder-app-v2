export const parseDataRegisterUser = (data) => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
  };
};
