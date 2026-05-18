const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const authProvider = {
  // Connexion — appelé quand l'admin soumet le formulaire login
  login: async ({ username, password }: { username: string; password: string }) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: username, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Identifiants incorrects.");
    }

    // Stocker les infos de l'admin dans localStorage
    localStorage.setItem("admin", JSON.stringify(data.user));

    return Promise.resolve();
  },

  // Déconnexion
  logout: async () => {
    localStorage.removeItem("admin");
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return Promise.resolve();
  },

  // Vérifie si connecté via la route session
  checkAuth: async () => {
    const res = await fetch(`${API_URL}/api/auth/session`, {
      credentials: "include",
    });

    const data = await res.json();

    if (!data.authenticated) {
      throw new Error("Non authentifié");
    }

    return Promise.resolve();
  },

  // Gère les erreurs 401/403 → déconnexion automatique
  checkError: (error: { status?: number }) => {
    const status = error?.status;
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Retourne les infos de l'admin connecté
  getIdentity: async () => {
    // D'abord on essaie le localStorage
    const stored = localStorage.getItem("admin");
    if (stored) {
      const admin = JSON.parse(stored);
      return Promise.resolve({
        id: admin.id,
        fullName: admin.name || admin.email,
        role: admin.role,
      });
    }

    // Sinon on appelle la session
    const res = await fetch(`${API_URL}/api/auth/session`, {
      credentials: "include",
    });

    const data = await res.json();

    if (!data.authenticated) {
      throw new Error("Non authentifié");
    }

    return Promise.resolve({
      id: data.adminId,
      fullName: data.email,
    });
  },

  // Permissions basées sur le rôle
  getPermissions: async () => {
    const stored = localStorage.getItem("admin");
    if (stored) {
      const admin = JSON.parse(stored);
      return Promise.resolve(admin.role || "admin");
    }
    return Promise.resolve("admin");
  },
};

export default authProvider;