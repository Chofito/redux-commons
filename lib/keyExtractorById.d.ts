declare type KeyExtractorByIdConfigurationType = {
    clear?: Array<string>;
    set?: Array<string>;
    extractionKey?: string;
    idKey?: string;
    default: unknown;
};
declare type KeyExtractorByIdActionType = {
    type: string;
    payload: Object;
};
declare const keyExtractorById: (configuration: KeyExtractorByIdConfigurationType) => (state: {
    [x: string]: unknown;
    [x: number]: unknown;
}, action: KeyExtractorByIdActionType) => unknown;
export default keyExtractorById;
