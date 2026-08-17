import { useState, useContext, createContext } from "react";

type AuthType = {
  token: string | null;
  estConnecte: boolean;
  seConnecter: (t: string) => void;
  seDeconnecter: () => void;
};

const AuthContext = createContext<AuthType>(null as any);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );

  function seConnecter(t: string) {
    localStorage.setItem("accessToken", t);
    setToken(t);
  }

  function seDeconnecter() {
    localStorage.removeItem("accessToken");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        estConnecte: !!token,
        seConnecter,
        seDeconnecter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);