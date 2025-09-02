import useJwt from '@src/@core/auth/jwt/useJwt'

/** 
 * Constants for localStorage keys
 */
const LOCAL_STORAGE_USER_DATA_KEY = 'userData';
const LOCAL_STORAGE_TOKEN_KEY = useJwt.jwtConfig.storageTokenKeyName;

/**
 * Utility function to check if the user is logged in
 * Checks for the presence of user data and token in localStorage
 * 
 * @returns {Boolean} - Whether the user is logged in
 */
export const isUserLoggedIn = () => {
  const userData = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  return userData && token;
};

/**
 * Utility function to retrieve user data from localStorage
 * 
 * @returns {Object|null} - Parsed user data from localStorage or null if not found
 */
export const getUserData = () => {
  const userData = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Function to return the appropriate home route based on the user's role
 * This could be extended to accommodate more roles or complex routing logic.
 *
 * @param {String} userRole - The role of the user (e.g., 'admin', 'client')
 * @returns {Object|String} - The route name or path for the user based on their role
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  switch (userRole) {
    case 'admin':
      return '/';
    case 'client':
      return { name: 'access-control' };
    default:
      return { name: 'auth-login' };
  }
};
