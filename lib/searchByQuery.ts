export default function searchOverRestaurants(
  res: { name: string },
  query: string
) {
  try {
    const result =
      Array.isArray(res) &&
      res.filter((res) => {
        if (res?.name.toLowerCase().includes(query)) {
          return res;
        }
      });
    return result;
  } catch (err) {
    console.log(err);
  }
}
