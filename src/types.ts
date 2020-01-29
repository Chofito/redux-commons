export type IdType = number | string;

export type ErrorType = {
  objectId?: number,
  status: number,
  message: string,
  extra?: Object,
  retryAction?: Object,
};

export type SimpleReducerType = (state: any, action: any) => any;

export type MaybeErrorType = {} | ErrorType;

export type GenericActionType = {
  type: string,
  payload?: Object,
};
