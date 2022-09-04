export async function setUserCookie(request, response, name, value) {
  const cookie = request.cookies["costumerId"];

  if (!cookie) {
    response.cookie(name, value, { httpOnly: true });
  }

  return response;
}
