declare type NextPageConfigurationType = {
    clear: Array<string>;
    set: Array<string>;
    nextPageKey?: string;
    default: number;
};
declare type NextPageActionType = {
    type: string;
    payload: Object | number;
};
declare const nextPage: (configuration: NextPageConfigurationType) => (state: number, action: NextPageActionType) => number;
export default nextPage;
