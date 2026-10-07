const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered',
    'auth/invalid-email': 'This email is invalid / badly formatted',
    'auth/weak-password': 'The password needs to be at least 6 characters',
    'auth/operation-not-allowed': 'Email/Password signin is not enabled for this app',
    'auth/invalid-credential': 'Email or Password entered is incorrect',
    'auth/user-disabled': 'This account exists but has been disabled',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again later',

};

export function getAuthErrorMessage(code: string): string {
    return errorMessages[code] ?? 'Something went wrong. Please try again.';
}