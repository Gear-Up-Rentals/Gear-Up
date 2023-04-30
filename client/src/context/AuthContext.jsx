import React, { useContext, useEffect, useState } from "react";
import { auth, provider, storage } from "../firebase.js";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import userApi from "../api/modules/user.api.js";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    displayName: "Guest",
    photoURL:
      "https://cdn.iconscout.com/icon/free/png-256/account-1439373-1214443.png",
  });
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredentials;
    const result = await getMongoUser()
    if(result.length !== 0){
    const { response , err } = await userApi.createUser({ name: user.displayName , uid: user.uid , email: user.email });
    // console.log(response);
    }
    return userCredentials;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function update(user) {
    return updateProfile(auth.currentUser, {
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  }

  async function uploadPhoto(file, folderName) {
    const storageRef = ref(storage, `${folderName}/${file.name}`);
    await uploadBytesResumable(storageRef, file);
    const result = await getDownloadURL(storageRef);
    return result;
  }

  async function signInPopup() {
    const userCredentials = await signInWithPopup(auth, provider)
    const { user } = userCredentials;
    const result = await getMongoUser()
    if(result.length === 0){
      const { response , err } = await userApi.createUser({ name: user.displayName , uid: user.uid , email: user.email });
      // console.log(response)
    }
    return userCredentials;
  }
  
    async function getMongoUser() {
    const id = currentUser.uid;
    const { response , err } = await userApi.getAllUsers({ uid:id })
    // return response
    if (response) {
      return response.data
    }
    if (err) {
      toast.error(err.message);
      return []
    }
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user !== null) {
        if (user.displayName == null) {
          user.displayName = "Guest";
        }
        if (user.photoURL == null) {
          user.photoURL = "https://cdn.iconscout.com/icon/free/png-256/account-1439373-1214443.png";
        }
        setCurrentUser(user);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    signInPopup,
    update,
    uploadPhoto,
    getMongoUser
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
