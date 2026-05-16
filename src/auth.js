export const Auth = {
  // =========================
  // SIGNUP
  // =========================
  signup(email, password, cb) {
    if (!email || !password) {
      alert("Please fill all fields");
      return false;
    }

    const existingUser = JSON.parse(localStorage.getItem("userData"));

    // prevent overwrite
    if (existingUser?.email === email) {
      alert("User already exists. Please login.");
      return false;
    }

    const user = {
      email,
      password, // (demo only)
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", email);

    cb?.();
    return true;
  },

  // =========================
  // LOGIN
  // =========================
  login(email, password, cb) {
    if (!email || !password) {
      alert("Please enter email and password");
      return false;
    }

    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (!savedUser) {
      alert("No user found. Please sign up first.");
      return false;
    }

    if (
      savedUser.email === email &&
      savedUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", email);

      cb?.();
      return true;
    }

    return false;
  },

  // =========================
  // LOGOUT
  // =========================
  logout(cb) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    cb?.();
  },

  // =========================
  // CHECK AUTH
  // =========================
  isAuthenticated() {
    return localStorage.getItem("isLoggedIn") === "true";
  },

  // =========================
  // CURRENT USER
  // =========================
  getCurrentUser() {
    return localStorage.getItem("currentUser");
  },

  // =========================
  // CHANGE PASSWORD
  // =========================
  changePassword(newPassword) {
    if (!newPassword) return false;

    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (!savedUser) return false;

    savedUser.password = newPassword;

    localStorage.setItem("userData", JSON.stringify(savedUser));

    return true;
  },
};