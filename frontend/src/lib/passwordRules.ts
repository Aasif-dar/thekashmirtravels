// Shared by the admin forms (browser) and the auth routes (server).

export const PASSWORD_RULES =
  "At least 10 characters, including a letter and a number.";

/** Returns a message describing what's wrong, or null if the password is OK. */
export function passwordProblem(password: string): string | null {
  if (password.length < 10) return "Use at least 10 characters.";
  if (password.length > 200) return "Use at most 200 characters.";
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "Include at least one letter and one number.";
  }
  return null;
}
