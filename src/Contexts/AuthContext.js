import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import React from "react";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { auth, provider } from "../Firebase/config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function signInWithGoogle() {
    return signInWithPopup(auth, provider).then((userInfo) => {
      console.log(userInfo);
      const userAddtionalDetails = getAdditionalUserInfo(userInfo);
      if (userAddtionalDetails.isNewUser) {
        const user = {
          name: userInfo.user.displayName,
          email: userInfo.user.email,
          profilePic: userInfo.user.photoURL,
        };
        fetch(`http://localhost:8000/users/add/${userInfo.user.uid}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((result) => result.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error.message));
      }
    });
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
