import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebaseConfig/Firebase.config";
import { Children, createContext, useEffect, useState } from "react";

const auth = getAuth(app);

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // user registration with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // user registration with google

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // login functionility here
  const singIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logOut functionility here

  const LogOut = () => {
    return signOut(auth);
  };

  // Update profile data
  const updateProfileData = (UpdateData) => {
    return updateProfile(auth.currentUser, UpdateData);
  };
  // authentication observer
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubcribe();
    };
  }, []);
  const authData = {
    createUser,
    user,
    setUser,
    signInWithGoogle,
    singIn,
    LogOut,
    loading,
    updateProfileData
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};
export default AuthProvider;
