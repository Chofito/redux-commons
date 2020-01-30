declare type KeyExtractorConfigurationType = {
    clear?: Array<string>;
    set?: Array<string>;
    extractionKey: string;
    default: unknown;
};
declare type KeyExtractorActionType = {
    type: string;
    payload: Object;
};
declare const keyExtractor: (configuration: KeyExtractorConfigurationType) => (state: unknown, action: KeyExtractorActionType) => unknown;
export default keyExtractor;
