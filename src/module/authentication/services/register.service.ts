import axios from "axios";

async function registerService({ email, password, firstName, lastName, age }) {
  console.log("process", process.env.SERVER_HOST);

  return axios.post(
    `${process.env.REACT_APP_BASE_URL_BE}/authentication/register`,
    {
      data: {
        email,
        password,
        firstName,
        lastName,
        age,
      },
    }
  );
}

export { registerService };
