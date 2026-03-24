interface SuccessResponse {
  res: any;
  message?: string;
  data?: any;
  meta?: any;
  statusCode?: number;
}
interface ErrorResponse {
  res: any;
  message?: string;
  code?: string;
  statusCode?: number;
  details?: any;
}

export const successResponse = ({
  res,
  message = "Success",
  data = null,
  meta = null,
  statusCode = 200,
}: SuccessResponse) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};

export const errorResponse = ({
  res,
  message = "Something went wrong",
  code = "InternalSearverError",
  statusCode = 500,
  details = null,
}: ErrorResponse) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      code,
      details,
    },
  });
};
