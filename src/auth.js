import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
} from "firebase/auth";

import { auth } from "./services/firebase";

export const Auth = {
  // =========================
  // SIGNUP
  // =========================

  signup(email, password) {
    if (!email || !password) {
      return Promise.reject(
        new Error("Please fill all fields")
      );
    }

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  },

  // =========================
  // LOGIN
  // =========================

  login(email, password) {
    if (!email || !password) {
      return Promise.reject(
        new Error("Please enter email and password")
      );
    }

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  },

  // =========================
  // LOGOUT
  // =========================

  logout() {
    return signOut(auth);
  },

  // =========================
  // AUTH LISTENER
  // =========================

  onAuthChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },

  // =========================
  // AUTH CHECK
  // =========================

  isAuthenticated() {
    return !!auth.currentUser;
  },

  // =========================
  // GET CURRENT USER
  // =========================

  getCurrentUser() {
    return auth.currentUser;
  },

  // =========================
  // CHANGE PASSWORD
  // =========================

  changePassword(newPassword) {
    if (!newPassword) {
      return Promise.reject(
        new Error("Please enter a new password")
      );
    }

    if (!auth.currentUser) {
      return Promise.reject(
        new Error("No user is logged in")
      );
    }

    return updatePassword(
      auth.currentUser,
      newPassword
    );
  },
};