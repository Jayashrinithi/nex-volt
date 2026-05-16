export const Auth = {
  
  // =========================
  // SIGNUP
  // =========================
  signup(email, password, cb) {

    // CHECK EMPTY FIELDS
    if (!email || !password) {
      alert("Please fill all fields");
      return false;
    }

    // USER OBJECT
    const user = {
      email,
      password,
      createdAt: new Date().toLocaleString(),
    };

    // SAVE USER
    localStorage.setItem(
      "userData",
      JSON.stringify(user)
    );

    // LOGIN STATUS
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    // SAVE CURRENT USER
    localStorage.setItem(
      "currentUser",
      email
    );

    // CALLBACK
    if (cb) cb();

    return true;
  },

  // =========================
  // LOGIN
  // =========================
  login(email, password, cb) {

    const savedUser = JSON.parse(
      localStorage.getItem("userData")
    );

    // CHECK USER
    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {

      // LOGIN SUCCESS
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "currentUser",
        email
      );

      if (cb) cb();

      return true;
    }

    // LOGIN FAILED
    return false;
  },

  // =========================
  // LOGOUT
  // =========================
  logout(cb) {

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "currentUser"
    );

    if (cb) cb();
  },

  // =========================
  // CHECK AUTHENTICATION
  // =========================
  isAuthenticated() {
    return (
      localStorage.getItem(
        "isLoggedIn"
      ) === "true"
    );
  },

  // =========================
  // GET CURRENT USER
  // =========================
  getCurrentUser() {
    return localStorage.getItem(
      "currentUser"
    );
  },

  // =========================
  // CHANGE PASSWORD
  // =========================
  changePassword(newPassword) {

    const savedUser = JSON.parse(
      localStorage.getItem("userData")
    );

    if (savedUser) {

      savedUser.password =
        newPassword;

      localStorage.setItem(
        "userData",
        JSON.stringify(savedUser)
      );

      return true;
    }

    return false;
  },
};