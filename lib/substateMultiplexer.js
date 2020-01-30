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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var byId_1 = require("./byId");
var order_1 = require("./order");
var selected_1 = require("./selected");
var initialState = {
    byId: {},
    order: [],
    selected: null,
    substates: {},
};
var substateMultiplexer = function (configuration) {
    var byIdOrderAndSelectedReducer = redux_1.combineReducers({
        byId: byId_1.default({
            added: configuration.added,
            fetched: configuration.fetched,
            removed: configuration.removed,
            cleared: configuration.cleared,
            idKey: configuration.idKey,
        }),
        order: order_1.default({
            added: configuration.added,
            fetched: configuration.fetched,
            replaced: configuration.replaced,
            removed: configuration.removed,
            confirmed: configuration.confirmed,
            cleared: configuration.cleared,
            sorted: configuration.sorted,
            idKey: configuration.idKey,
            preferPrepend: configuration.preferPrepend,
        }),
        selected: selected_1.default({
            selected: configuration.selected,
            allDeselected: configuration.allDeselected,
            default: null,
        }),
    });
    return function (state, action) {
        var _a;
        if (state === void 0) { state = initialState; }
        // Initial run of the reducer needs to return the reference to the initial state
        if (configuration.rehydrated && configuration.rehydrated.includes(action.type)) {
            return state;
        }
        var substates = state.substates;
        var newSubstates = __assign({}, substates);
        var byIdOrderAndSelected = byIdOrderAndSelectedReducer({
            byId: state.byId,
            order: state.order,
            selected: state.selected,
        }, action);
        var byId = byIdOrderAndSelected.byId, order = byIdOrderAndSelected.order;
        var selected = byIdOrderAndSelected.selected;
        // Select the first one if just added one and there was anything selected
        if (((configuration.added && configuration.added.includes(action.type)) ||
            (configuration.fetched && configuration.fetched.includes(action.type))) &&
            order.length > 0 &&
            selected === null) {
            selected = order[0];
        }
        // Remove substate
        if (configuration.removed && configuration.removed.includes(action.type)) {
            var payload = action.payload;
            if (typeof payload === 'number' || typeof payload === 'string') {
                delete newSubstates[payload];
            }
        }
        // Re-select if removed the one that is currently selected
        if (configuration.removed &&
            configuration.removed.includes(action.type) &&
            selected !== null &&
            !order.includes(selected)) {
            // If there are another options, select the first one
            if (order.length > 0) {
                selected = order[0];
                // Mark that nothing is selected
            }
            else {
                selected = null;
            }
        }
        return {
            byId: byId,
            order: order,
            selected: selected,
            substates: selected != null
                ? __assign(__assign({}, newSubstates), (_a = {}, _a[selected] = configuration.reducer(newSubstates[selected], action), _a)) : newSubstates,
        };
    };
};
exports.default = substateMultiplexer;
exports.reselectWithMultiplexer = function (selector) { return function (multiplexerState) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var selected = multiplexerState.selected, substates = multiplexerState.substates;
    if (selected != null) {
        if (substates[selected] != null) {
            return selector.apply(void 0, __spreadArrays([substates[selected]], args));
        }
        else {
            throw new Error('Invalid selected substate');
        }
    }
    else {
        throw new Error('No substate is selected');
    }
}; };
exports.multipleReselectsWithMultiplexer = function (_a) {
    var _b = _a.selectors, selectors = _b === void 0 ? {} : _b, _c = _a.excluded, excluded = _c === void 0 ? [] : _c;
    var wSelectors = {};
    Object.keys(selectors)
        .filter(function (selectorName) { return selectorName !== 'default' && !excluded.includes(selectorName); })
        .forEach(function (selectorName) {
        wSelectors[selectorName] = exports.reselectWithMultiplexer(selectors[selectorName]);
    });
    return wSelectors;
};
