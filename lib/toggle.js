"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toggle = function (configuration) { return function (state, action) {
    if (state === void 0) { state = false; }
    var turnedOn = configuration.turnedOn, turnedOff = configuration.turnedOff;
    if (turnedOn != null && turnedOn.includes(action.type)) {
        return true;
    }
    if (turnedOff != null && turnedOff.includes(action.type)) {
        return false;
    }
    return state;
}; };
exports.default = toggle;
