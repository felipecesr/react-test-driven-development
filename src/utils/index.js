export function processToken(token) {
  const claims = JSON.parse(window.atob(token.split('.')[1]))
  return claims.exp * 1000
}
