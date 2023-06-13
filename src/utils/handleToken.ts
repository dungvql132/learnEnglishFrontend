function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  try {
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    return false;
  }
}

export { getToken, setToken };
