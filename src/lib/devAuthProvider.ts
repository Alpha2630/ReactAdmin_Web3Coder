export const authProvider = {
  login: (params: any) => Promise.resolve(),
  logout: (params: any) => Promise.resolve(),
  checkAuth: (params: any) => Promise.resolve(),
  checkError: (error: any) => Promise.resolve(),
  getPermissions: (params: any) => Promise.resolve(),
};

export default authProvider;
