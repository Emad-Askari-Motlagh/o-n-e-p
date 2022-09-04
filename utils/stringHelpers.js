export function trimUserName(user) {
  if (user?.match(format)) {
    const emi = user && user?.split(format)[0];
    const firstLetter = emi.charAt(0).toUpperCase();
    return emi.replace(emi.charAt(0), firstLetter);
  } else {
    return user;
  }
}
