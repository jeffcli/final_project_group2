"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema_1 = require("./schema");
exports.default = mongoose_1.default.models.friends || (0, mongoose_1.model)("friends", schema_1.FriendsSchema);
