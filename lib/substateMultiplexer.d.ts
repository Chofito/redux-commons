import { IdType } from './types';
import { OrderActionType } from './order';
declare type SubstateMultiplexerConfigurationType = {
    added?: Array<string>;
    fetched?: Array<string>;
    removed?: Array<string>;
    cleared?: Array<string>;
    replaced?: Array<string>;
    confirmed?: Array<string>;
    sorted?: Array<string>;
    preferPrepend?: boolean;
    allDeselected?: Array<string>;
    selected?: Array<string>;
    rehydrated?: Array<string>;
    idKey?: string;
    reducer: Function;
};
export declare type SubstateMultiplexerStateType = {
    byId: {
        [key in IdType]: Object;
    };
    order: Array<IdType>;
    selected?: IdType;
    substates: Object;
};
declare const substateMultiplexer: (configuration: SubstateMultiplexerConfigurationType) => (state: SubstateMultiplexerStateType, action: OrderActionType) => SubstateMultiplexerStateType;
export default substateMultiplexer;
export declare const reselectWithMultiplexer: (selector: Function) => Function;
export declare const multipleReselectsWithMultiplexer: ({ selectors, excluded, }: {
    selectors: {
        [key: string]: Function;
    };
    excluded?: string[];
}) => {
    [key: string]: Function;
};
