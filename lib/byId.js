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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var byId = function (configuration) { return function (state, action) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (state === void 0) { state = {}; }
    var added = configuration.added, updated = configuration.updated, updatedInBulk = configuration.updatedInBulk, fetched = configuration.fetched, removed = configuration.removed, cleared = configuration.cleared, confirmed = configuration.confirmed, addedToArrayAttribute = configuration.addedToArrayAttribute, removedFromArrayAttribute = configuration.removedFromArrayAttribute, replacedInArrayAttribute = configuration.replacedInArrayAttribute, defaultAttributes = configuration.defaultAttributes, cascade = configuration.cascade, _m = configuration.idKey, idKey = _m === void 0 ? 'id' : _m, _o = configuration.customBehavior, customBehavior = _o === void 0 ? function (s, _a) { return s; } : _o;
    var payload = action.payload;
    if (payload != null) {
        if (added != null &&
            added.includes(action.type) &&
            typeof payload === 'object' &&
            (typeof payload[idKey] === 'number' || typeof payload[idKey] === 'string')) {
            return __assign(__assign({}, state), (_b = {}, _b[payload[idKey]] = __assign(__assign({}, (defaultAttributes || {})), payload), _b));
        }
        if (updated != null && updated.includes(action.type)) {
            if (typeof payload === 'object' && (typeof payload[idKey] === 'number' || typeof payload[idKey] === 'string')) {
                return __assign(__assign({}, state), (_c = {}, _c[payload[idKey]] = __assign(__assign({}, state[payload[idKey]]), payload), _c));
            }
        }
        if (updatedInBulk != null && updatedInBulk.includes(action.type)) {
            if (typeof payload === 'object' && typeof payload.order !== 'undefined' && payload.order.constructor === Array) {
                var order = payload.order, attributes_1 = __rest(payload, ["order"]);
                var newState_1 = __assign({}, state);
                order.forEach(function (id) {
                    newState_1[id] = __assign(__assign({}, state[id]), attributes_1);
                });
                return newState_1;
            }
            else if (typeof payload === 'object' && typeof payload.entities === 'object') {
                var newState_2 = __assign({}, state);
                Object.keys(payload.entities).forEach(function (id) {
                    if (state[id] && payload.entities) {
                        newState_2[id] = __assign(__assign({}, state[id]), payload.entities[id]);
                    }
                });
                return newState_2;
            }
        }
        if (fetched != null && fetched.includes(action.type)) {
            if (typeof payload === 'object' && typeof payload.entities === 'object') {
                var newEntities_1 = {};
                Object.keys(payload.entities).forEach(function (id) {
                    newEntities_1[id] = __assign(__assign(__assign({}, (defaultAttributes || {})), (payload.entities || {})[Number.isNaN(parseInt(id)) ? id : parseInt(id, 10)]), { isConfirmed: true });
                });
                return __assign(__assign({}, state), newEntities_1);
            }
        }
        if (removed != null && removed.includes(action.type)) {
            // TODO: handle payload object with id attribute
            // TODO: handle payload array
            if (typeof payload === 'number' || typeof payload === 'string') {
                var newState = __assign({}, state);
                delete newState[payload];
                return newState;
            }
        }
        if (confirmed != null && confirmed.includes(action.type)) {
            if (typeof payload === 'object') {
                var oldId = payload.oldId, newId = payload.newId, extra = __rest(payload, ["oldId", "newId"]);
                if (typeof oldId !== 'undefined' && typeof newId !== 'undefined' && typeof state[oldId] !== 'undefined') {
                    var newState_3 = __assign({}, state);
                    newState_3[newId] = __assign(__assign(__assign({}, newState_3[oldId]), extra), { id: newId, isConfirmed: true });
                    delete newState_3[oldId];
                    return newState_3;
                }
                var newState_4 = {};
                Object.keys(state).forEach(function (key) {
                    newState_4[key] = __assign(__assign({}, state[key]), { isConfirmed: true });
                });
                return newState_4;
            }
        }
        if (addedToArrayAttribute != null && addedToArrayAttribute.includes(action.type)) {
            if (typeof payload === 'object') {
                var id = payload[idKey];
                var key = payload.key, _p = payload.order, order = _p === void 0 ? [] : _p, atIndex = payload.atIndex;
                if (typeof id !== 'undefined' && typeof state[id] !== 'undefined') {
                    var oldOrder_1 = state[id][key] || [];
                    if (typeof atIndex !== 'undefined') {
                        return __assign(__assign({}, state), (_d = {}, _d[id] = __assign(__assign({}, state[id]), (_e = {}, _e[key] = __spreadArrays(oldOrder_1.slice(0, atIndex), order.filter(function (i) { return !oldOrder_1.includes(i); }), oldOrder_1.slice(atIndex)), _e)), _d));
                    }
                    return __assign(__assign({}, state), (_f = {}, _f[id] = __assign(__assign({}, state[id]), (_g = {}, _g[key] = __spreadArrays(oldOrder_1, order.filter(function (i) { return !oldOrder_1.includes(i); })), _g)), _f));
                }
            }
            return state;
        }
        if (removedFromArrayAttribute != null && removedFromArrayAttribute.includes(action.type)) {
            if (typeof payload === 'object') {
                var id = payload[idKey];
                var key = payload.key, _q = payload.order, order_1 = _q === void 0 ? [] : _q;
                if (typeof id !== 'undefined' && typeof state[id] !== 'undefined') {
                    var oldOrder = state[id][key] || [];
                    return __assign(__assign({}, state), (_h = {}, _h[id] = __assign(__assign({}, state[id]), (_j = {}, _j[key] = oldOrder.filter(function (i) { return !order_1.includes(i); }), _j)), _h));
                }
            }
            return state;
        }
        if (replacedInArrayAttribute != null && replacedInArrayAttribute.includes(action.type)) {
            if (typeof payload === 'object') {
                var id = payload[idKey];
                var _r = payload.oldValues, oldValues_1 = _r === void 0 ? [] : _r, _s = payload.newValues, newValues_1 = _s === void 0 ? [] : _s, key = payload.key;
                if (typeof id !== 'undefined' && typeof state[id] !== 'undefined') {
                    var oldOrder = state[id][key] || [];
                    return __assign(__assign({}, state), (_k = {}, _k[id] = __assign(__assign({}, state[id]), (_l = {}, _l[key] = oldOrder.map(function (oldValue) {
                        return oldValues_1.includes(oldValue) ? newValues_1[oldValues_1.indexOf(oldValue)] : oldValue;
                    }), _l)), _k));
                }
            }
            return state;
        }
        // REMEMBER THAT THIS CASCADE GIMMICK ONLY WORKS ONE LEVEL DEEP
        // If you want more depth, tie delete actions with sagas, but for most cases
        // this will do the trick.
        if (cascade != null) {
            var fk_1 = cascade[action.type];
            if (typeof fk_1 !== 'undefined') {
                if (typeof payload === 'number' || typeof payload === 'string') {
                    var removedId_1 = payload;
                    var newState_5 = {};
                    Object.keys(state)
                        .map(function (elementKey) { return state[parseInt(elementKey, 10)]; })
                        .forEach(function (element) {
                        if (typeof element[fk_1] !== 'undefined' && element[fk_1] !== removedId_1) {
                            newState_5[element.id] = element;
                        }
                    });
                    return newState_5;
                }
            }
        }
        if (cleared != null && cleared.includes(action.type)) {
            return {};
        }
    }
    return customBehavior(state, action);
}; };
exports.default = byId;
