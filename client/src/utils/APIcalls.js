// login
export const attemptSignup = async (values) => {
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
    if (!signupResponse) return;

    // console.log the response
    console.log(signupResponse);
  } catch (err) {
    console.error(err);
    return err;
  }
}

// login
export const attemptLogin = async (values) => {
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
    if (!loginResponse) return;

    // console.log the response
    console.log(loginResponse);
  } catch (err) {
    console.error(err);
    return err;
  }
}