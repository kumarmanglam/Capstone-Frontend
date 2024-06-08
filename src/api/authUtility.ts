export const isTokenExpired = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return true; // Token not found or null
  }
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    return true; // Invalid token format
  }
  const payload = tokenParts[1];
  const decodedPayload = atob(payload);
  const parsedPayload = JSON.parse(decodedPayload);
  if (!parsedPayload || !parsedPayload.exp) {
    return true; // Invalid payload or no expiry time
  }
  const expiryTime = parsedPayload.exp * 1000; // Expiry time in milliseconds
  return Date.now() > expiryTime;
};

export const isUserLoggedIn = () => {
  if (isTokenExpired()) {
    sessionStorage.clear();
  }
  const token = sessionStorage.getItem("token");
  return token != null;
};
