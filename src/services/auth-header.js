export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // Para Spring Boot o Node.js con header personalizado
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}