export const StatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
} as const;

export type UStatusCodes = typeof StatusCodes[keyof typeof StatusCodes];
export type TStatusCodes = {
  [key in UStatusCodes]: string;
};
