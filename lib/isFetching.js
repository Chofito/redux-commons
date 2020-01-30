"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isFetching = function (configuration) { return function (state, action) {
    if (state === void 0) { state = false; }
    var started = configuration.started, succeed = configuration.succeed, failed = configuration.failed;
    if (started != null && started.includes(action.type)) {
        return true;
    }
    if ((failed != null && failed.includes(action.type)) || (succeed != null && succeed.includes(action.type))) {
        return false;
    }
    return state;
}; };
exports.default = isFetching;
