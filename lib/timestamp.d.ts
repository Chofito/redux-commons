declare type TimestampConfigurationType = {
    clear: Array<string>;
    set: Array<string>;
    timestampKey?: string;
    default: number;
};
declare type TimestampActionType = {
    type: string;
    payload: Object | number;
};
declare const timestamp: (configuration: TimestampConfigurationType) => (state: number, action: TimestampActionType) => number;
export default timestamp;
