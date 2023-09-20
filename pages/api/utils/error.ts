
type Error = {
  cause?: unknown,
  stack?: string | undefined,
  message: string,
  name: string,
  status?: number
}

export const createError = (status: number, message: string) => {
  const err: Error = new Error()
  err.status = status;
  err.message = message;
  return err;
};
export const createNewError = (error: Error) => {
  error.status = error.status || 500;
  error.message = error.message|| "internal server error";
  return error;
};
