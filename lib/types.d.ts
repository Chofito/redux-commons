export declare type IdType = number | string;
export declare type ErrorType = {
    objectId?: number;
    status: number;
    message: string;
    extra?: Object;
    retryAction?: Object;
};
export declare type SimpleReducerType = (state: any, action: any) => any;
export declare type MaybeErrorType = {} | ErrorType;
export declare type GenericActionType = {
    type: string;
    payload?: any;
};
