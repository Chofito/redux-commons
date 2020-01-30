import { IdType } from './types';
declare type OrderByIdConfigurationType = {
    fetched?: Array<string>;
    replaced?: Array<string>;
    idKey?: string;
    orderKey?: string;
};
declare type OrderByIdActionType = {
    type: string;
    payload: {
        order?: Array<IdType>;
    };
};
declare const orderById: (configuration: OrderByIdConfigurationType) => (state: {
    [x: string]: (string | number)[];
    [x: number]: (string | number)[];
}, action: OrderByIdActionType) => {
    [x: string]: (string | number)[];
    [x: number]: (string | number)[];
};
export default orderById;
