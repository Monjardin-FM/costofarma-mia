export const verifyResponse = async ({ response }: { response?: Response }) => {
  if (!response || !response.ok)
    throw new Error("An error occurred during the call to the web service");

  const body = await response.json();
  const SUCCESS_CODE = 200;
  const isSuccess = body.statusCode === SUCCESS_CODE && body.isSuccess;
  if (!isSuccess) throw new Error("The response was not successful");

  return {
    body,
  };
};
