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
var keyExtractorById = function (configuration) { return function (state, action) {
    var _a, _b;
    if (state === void 0) { state = {}; }
    var clear = configuration.clear, set = configuration.set, extractionKey = configuration.extractionKey, _c = configuration.idKey, idKey = _c === void 0 ? 'id' : _c;
    if (clear != null && clear.includes(action.type)) {
        return __assign(__assign({}, state), (_a = {}, _a[action.payload[idKey]] = undefined, _a));
    }
    if (set != null && set.includes(action.type)) {
        var payload = action.payload;
        return __assign(__assign({}, state), (_b = {}, _b[payload[idKey]] = payload[extractionKey], _b));
    }
    return state;
}; };
exports.default = keyExtractorById;
