import { useContext, useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Initial auth state
  const [auth, setAuth] = useState(
    (localStorage.getItem("auth") !== null &&
      new Date() < new Date(JSON.parse(localStorage.getItem("auth")).expires_at))
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );

  // Method to update the user profile
  const updateUserProfile = (updatedProfile) => {
    if (auth && auth._id === updatedProfile._id) {
      setAuth({ ...auth, ...updatedProfile });
      // Update local storage as well if needed
      localStorage.setItem("auth", JSON.stringify({ ...auth, ...updatedProfile }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
