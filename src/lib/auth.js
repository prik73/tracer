import { SignJWT, jwtVerify } from 'jose';
import Cookies from 'js-cookie';

// Get credentials from environment variables
const CREDENTIALS = {
  username: import.meta.env.VITE_AUTH_USERNAME,
  password: import.meta.env.VITE_AUTH_PASSWORD
};

// Secret key for JWT
const SECRET_KEY = new TextEncoder().encode(
  import.meta.env.VITE_JWT_SECRET || 'fallback-secret-key-change-in-production'
);

const TOKEN_NAME = 'auth_token';
const TOKEN_EXPIRY_DAYS = 2;

/**
 * Hash password using SHA-256
 */
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify login credentials
 */
export const verifyCredentials = async (username, password) => {
  if (!CREDENTIALS.username || !CREDENTIALS.password) {
    console.error('❌ Authentication credentials not configured');
    return false;
  }
  
  // Direct comparison for personal use (credentials stored in env, not in code)
  return username === CREDENTIALS.username && password === CREDENTIALS.password;
};

// Rest of the code stays the same...
export const generateToken = async (username) => {
  const token = await new SignJWT({ 
    username,
    iat: Date.now()
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_EXPIRY_DAYS}d`)
    .sign(SECRET_KEY);
  
  return token;
};

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
};

export const saveToken = (token) => {
  Cookies.set(TOKEN_NAME, token, {
    expires: TOKEN_EXPIRY_DAYS,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    path: '/'
  });
};

export const getToken = () => {
  return Cookies.get(TOKEN_NAME);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_NAME, { path: '/' });
};

export const isAuthenticated = async () => {
  const token = getToken();
  if (!token) return false;
  
  const payload = await verifyToken(token);
  return !!payload;
};