import axios from "axios";

async function loginService({ email, password }) {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL_BE}/authentication/login`,
    {
      data: {
        email: email,
        password: password,
      },
    }
  );
}

export { loginService };
