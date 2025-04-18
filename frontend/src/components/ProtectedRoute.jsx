import { Navigate } from 'react-router-dom';

// Assuming you have a function to check if the user is authenticated.
const isAuthenticated = () => {
  // Replace this with your actual authentication check (e.g., checking a token or user session)
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
