export const validateEmail = (email) => {
    // Регулярное выражение для проверки валидности email
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegExp.test(email);
  };