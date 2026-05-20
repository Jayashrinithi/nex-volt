export const Auth = {

  // =========================
  // SIGNUP
  // =========================

  signup(email, password, cb) {

    if (!email || !password) {

      alert("⚠ Please fill all fields");

      return false;
    }

    // get users array
    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    // check existing user
    const existingUser =
      users.find(
        (u) => u.email === email
      );

    if (existingUser) {

      alert(
        "⚠ User already exists. Please login."
      );

      return false;
    }

    // create new user
    const newUser = {

      email,
      password, // demo only

      createdAt:
        new Date().toISOString(),
    };

    // save user
    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    // login automatically
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "currentUser",
      email
    );

    cb?.();

    return true;
  },

  // =========================
  // LOGIN
  // =========================

  login(email, password, cb) {

    if (!email || !password) {

      alert(
        "⚠ Please enter email and password"
      );

      return false;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    // find matching user
    const matchedUser =
      users.find(
        (u) =>
          u.email === email &&
          u.password === password
      );

    if (!matchedUser) {

      alert(
        "❌ Invalid email or password"
      );

      return false;
    }

    // session
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "currentUser",
      email
    );

    cb?.();

    return true;
  },

  // =========================
// LOGOUT
// =========================
logout(cb) {

  // remove login session only
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");

  // force app refresh
  window.dispatchEvent(new Event("authChanged"));

  cb?.();
},

  // =========================
  // AUTH CHECK
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

    if (!newPassword) {

      return false;
    }

    const currentUser =
      localStorage.getItem(
        "currentUser"
      );

    if (!currentUser) {

      return false;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const updatedUsers =
      users.map((user) => {

        if (
          user.email === currentUser
        ) {

          return {

            ...user,
            password: newPassword,
          };
        }

        return user;
      });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    return true;
  },
};