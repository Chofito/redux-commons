declare type IsFetchingConfigurationType = {
    started?: Array<string>;
    succeed?: Array<string>;
    failed?: Array<string>;
};
declare type IsFetchingActionType = {
    type: string;
};
declare const isFetching: (configuration: IsFetchingConfigurationType) => (state: boolean, action: IsFetchingActionType) => boolean;
export default isFetching;
