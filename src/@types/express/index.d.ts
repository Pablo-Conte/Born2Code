/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    user: {
      userId: string;
      isAdmin?: boolean;
    };
  }
}
