export const Auth = {
  
  // SIGNUP
  signup(email, password, cb) {
    const user = {
      email,
      password,
    };

    localStorage.setItem(
      "userData",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    if (cb) cb();
  },

  // LOGIN
  login(email, password, cb) {
    const savedUser = JSON.parse(
      localStorage.getItem("userData")
    );

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      if (cb) cb();

      return true;
    }

    return false;
  },

  // LOGOUT
  logout(cb) {
    localStorage.removeItem(
      "isLoggedIn"
    );

    if (cb) cb();
  },

  // CHECK AUTH
  isAuthenticated() {
    return (
      localStorage.getItem(
        "isLoggedIn"
      ) === "true"
    );
  },
};