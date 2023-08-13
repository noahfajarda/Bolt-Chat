import decode from 'jwt-decode';

// login
export const attemptSignup = async (values, navigate, setUser, setError) => {
  try {
    // attempt to login using API
    const attemptSignup = await fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const signupResponse = await attemptSignup.json();

    // if there's no 'signup response', early return
    if (!signupResponse) return;

    // set the user to the 'signup response'
    setUser({ ...signupResponse })

    // if there's a status,
    if (signupResponse.status) {
      // show the status as Error state
      setError(signupResponse.status)
    } else if (signupResponse.loggedIn) {
      // set session storage to the token
      sessionStorage.setItem('user', signupResponse.token)
      navigate("/home")
    }

  } catch (err) {
    console.error(err);
    return err;
  }
}

// login
export const attemptLogin = async (values, navigate, setUser, setError) => {
  try {
    // attempt to login using API
    const attemptLogin = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const loginResponse = await attemptLogin.json();

    // if there's no 'login response', early return
    if (!loginResponse) return;

    // set the user to the 'login response'
    setUser({ ...loginResponse })

    // if there's a status,
    if (loginResponse.status) {
      // show the status as Error state
      setError(loginResponse.status)
    } else if (loginResponse.loggedIn) {
      // console.log the response and navigate to home page
      console.log(loginResponse);
      navigate("/home")
    }
  } catch (err) {
    console.error(err);
    return err;
  }
}

export const getLoggedInUserData = async (setUser, navigate) => {
  // if data, setUser(true), else, setUser(false)
  try {
    const token = decode(sessionStorage.getItem('user'))

    navigate("/home");
    setUser({ ...token })
  } catch (e) {
    if (e.message == "Invalid token specified") {
      console.log("bad token")
    }
    setUser({ loggedIn: false });
  }
};