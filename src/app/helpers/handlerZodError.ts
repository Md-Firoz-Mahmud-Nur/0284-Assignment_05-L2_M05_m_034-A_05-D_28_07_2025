import { ZodError } from "zod";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/error.types";

export const handlerZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err.issues.forEach((error: any) => {
    if (error.code === "unrecognized_keys") {
      if (error.keys.length === 1) {
        errorSources.push({
          path: error.path.join("."),
          message: `Cannot update ${error.keys[0]}`,
        });
      } else if (error.keys.length > 1) {
        errorSources.push({
          path: error.path.join("."),
          message: `Cannot update ${error.keys.join(", ")}`,
        });
      } else {
        errorSources.push({
          // path: error.path[error.path.length - 1],
          path: error.path.length > 1 && error.path.reverse().join(" inside "),
          message: error.message,
        });
      }
    }
  });

  return {
    statusCode: 400,
    message: "Zod Error",
    errorSources,
  };
};
