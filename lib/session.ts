// Temporary session helper: signed cookie with an expiry.
// Replace with Firebase Auth once it is set up.

export const SESSION_COOKIE = "pt_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

const encoder = new TextEncoder();

async function hmacHex(message: string): Promise<string> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Creates a token of the form `<expiresAtMs>.<signature>`. */
export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  return `${expiresAt}.${await hmacHex(String(expiresAt))}`;
}

/** Returns true only for an untampered token that has not expired. */
export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) <= Date.now()) return false;

  return signature === (await hmacHex(expiresAt));
}
