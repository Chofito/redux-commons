"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var singleton = function (configuration) { return function (state, action) {
    if (state === void 0) { state = null; }
    var clear = configuration.clear, populate = configuration.populate, update = configuration.update;
    if (clear != null && clear.includes(action.type)) {
        return null;
    }
    if (populate != null && populate.includes(action.type)) {
        return action.payload;
    }
    if (update != null && update.includes(action.type)) {
        return __assign(__assign({}, state), action.payload);
    }
    return state;
}; };
exports.default = singleton;
