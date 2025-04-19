// utils/getUserFromToken.js

export const getUserFromToken = () => {
  const token = localStorage.getItem("token"); // Assuming you're storing the token in localStorage
  if (!token) return null;

  // Decode the JWT token (JWT is base64 encoded, so we split and decode it)
  const payload = JSON.parse(atob(token.split(".")[1]));

  return payload.user; // Assuming the user info is stored under the "user" field in the JWT payload
};
