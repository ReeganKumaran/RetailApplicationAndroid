export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
}
export const validatePassword = (password) => {
    return password.length >= 8;
}
