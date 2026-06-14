export function getAdminCredentials() {
  return {
    username: (process.env.ADMIN_USERNAME ?? "temi ibrahim").trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD ?? "temi@1234",
    sessionToken:
      process.env.ADMIN_SESSION_TOKEN ?? "arthur60-admin-session-v1",
  };
}

export function validateAdminLogin(username: string, password: string): boolean {
  const creds = getAdminCredentials();
  return (
    username.trim().toLowerCase() === creds.username && password === creds.password
  );
}

export function validateAdminToken(token: string | null): boolean {
  if (!token) return false;
  return token === getAdminCredentials().sessionToken;
}
