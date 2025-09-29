export function getErrorMessage(code: string) {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email. Please sign up.";
    case "auth/wrong-password":
      return "Incorrect password. Try again.";
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/invalid-credential":
      return "Invalid credentials. Username/Password is incorrect.";
    default:
      return "Something went wrong. Please try again.";
  }
}
