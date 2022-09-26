export default function captalizeFirstLetter(
  input: string
): string | undefined {
  if (!input) return;
  const res = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  return res;
}
