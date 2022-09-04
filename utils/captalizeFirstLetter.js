const captalizer = (value) => {
  if (!value) return null;
  if (typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
};
export default captalizer;
