export const authProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return Promise.reject(data.message || "Identifiants incorrects.");
    }

    return Promise.resolve();
  },

  logout: async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return Promise.resolve();
  },

  checkAuth: async () => {
    const response = await fetch("/api/auth/session");
    if (response.ok) {
      return Promise.resolve();
    }
    return Promise.reject();
  },

  checkError: async (error: any) => {
    if (error?.status === 401 || error?.status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: async () => Promise.resolve(),

  getIdentity: async () => {
    const response = await fetch("/api/auth/session");
    if (!response.ok) {
      return Promise.reject();
    }
    const data = await response.json();
    return Promise.resolve({
      id: data.user?.adminId || data.user?.id,
      fullName: data.user?.email || data.user?.name || "Admin",
    });
  },
};

export default authProvider;
