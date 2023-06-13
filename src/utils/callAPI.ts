import axios from "axios";

async function getAllWord() {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL_BE}/routes/learnEnglish/word`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

async function getAllWordType() {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL_BE}/routes/learnEnglish/wordType`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

async function getCurrentUser() {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL_BE}/authentication/currentUser`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

async function postWord(data) {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL_BE}/routes/learnEnglish/word`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export { getAllWord, getAllWordType, getCurrentUser, postWord };
