"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeliveryUserStatus = exports.EditDeliveryProfile = exports.GetDeliveryProfile = exports.DeliveryLogin = exports.DeliverySignUp = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var dto_1 = require("../dto");
var models_1 = require("../models");
var utility_1 = require("../utility");
var DeliverySignUp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deliveryUserInputs, validationError, email, phone, password, address, firstName, lastName, pincode, salt, userPassword, existingDeliveryUser, result, signature;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deliveryUserInputs = (0, class_transformer_1.plainToClass)(dto_1.CreateDeliveryUserInput, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(deliveryUserInputs, {
                        validationError: { target: true },
                    })];
            case 1:
                validationError = _a.sent();
                if (validationError.length > 0) {
                    return [2 /*return*/, res.status(400).json(validationError)];
                }
                email = deliveryUserInputs.email, phone = deliveryUserInputs.phone, password = deliveryUserInputs.password, address = deliveryUserInputs.address, firstName = deliveryUserInputs.firstName, lastName = deliveryUserInputs.lastName, pincode = deliveryUserInputs.pincode;
                return [4 /*yield*/, (0, utility_1.GenerateSalt)()];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, (0, utility_1.GeneratePassword)(password, salt)];
            case 3:
                userPassword = _a.sent();
                return [4 /*yield*/, models_1.DeliveryUser.findOne({ email: email })];
            case 4:
                existingDeliveryUser = _a.sent();
                if (existingDeliveryUser !== null) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "A Delivery User exist with the provided email ID!" })];
                }
                return [4 /*yield*/, models_1.DeliveryUser.create({
                        email: email,
                        password: userPassword,
                        salt: salt,
                        phone: phone,
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        pincode: pincode,
                        verified: false,
                        lat: 0,
                        lng: 0,
                    })];
            case 5:
                result = _a.sent();
                if (!result) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, utility_1.GenerateSignature)({
                        _id: result._id,
                        email: result.email,
                        verified: result.verified,
                    })];
            case 6:
                signature = _a.sent();
                // Send the result
                return [2 /*return*/, res
                        .status(201)
                        .json({ signature: signature, verified: result.verified, email: result.email })];
            case 7: return [2 /*return*/, res.status(400).json({ msg: "Error while creating Delivery user" })];
        }
    });
}); };
exports.DeliverySignUp = DeliverySignUp;
var DeliveryLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var loginInputs, validationError, email, password, deliveryUser, validation, signature;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                loginInputs = (0, class_transformer_1.plainToClass)(dto_1.UserLoginInput, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(loginInputs, {
                        validationError: { target: true },
                    })];
            case 1:
                validationError = _a.sent();
                if (validationError.length > 0) {
                    return [2 /*return*/, res.status(400).json(validationError)];
                }
                email = loginInputs.email, password = loginInputs.password;
                return [4 /*yield*/, models_1.DeliveryUser.findOne({ email: email })];
            case 2:
                deliveryUser = _a.sent();
                if (!deliveryUser) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, utility_1.ValidatePassword)(password, deliveryUser.password, deliveryUser.salt)];
            case 3:
                validation = _a.sent();
                if (validation) {
                    signature = (0, utility_1.GenerateSignature)({
                        _id: deliveryUser._id,
                        email: deliveryUser.email,
                        verified: deliveryUser.verified,
                    });
                    return [2 /*return*/, res.status(200).json({
                            signature: signature,
                            email: deliveryUser.email,
                            verified: deliveryUser.verified,
                        })];
                }
                _a.label = 4;
            case 4: return [2 /*return*/, res.json({ msg: "Error Login" })];
        }
    });
}); };
exports.DeliveryLogin = DeliveryLogin;
var GetDeliveryProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deliveryUser, profile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deliveryUser = req.user;
                if (!deliveryUser) return [3 /*break*/, 2];
                return [4 /*yield*/, models_1.DeliveryUser.findById(deliveryUser._id)];
            case 1:
                profile = _a.sent();
                if (profile) {
                    return [2 /*return*/, res.status(201).json(profile)];
                }
                _a.label = 2;
            case 2: return [2 /*return*/, res.status(400).json({ msg: "Error while Fetching Profile" })];
        }
    });
}); };
exports.GetDeliveryProfile = GetDeliveryProfile;
var EditDeliveryProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deliveryUser, customerInputs, validationError, firstName, lastName, address, profile, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deliveryUser = req.user;
                customerInputs = (0, class_transformer_1.plainToClass)(dto_1.EditCustomerProfileInput, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(customerInputs, {
                        validationError: { target: true },
                    })];
            case 1:
                validationError = _a.sent();
                if (validationError.length > 0) {
                    return [2 /*return*/, res.status(400).json(validationError)];
                }
                firstName = customerInputs.firstName, lastName = customerInputs.lastName, address = customerInputs.address;
                if (!deliveryUser) return [3 /*break*/, 4];
                return [4 /*yield*/, models_1.DeliveryUser.findById(deliveryUser._id)];
            case 2:
                profile = _a.sent();
                if (!profile) return [3 /*break*/, 4];
                profile.firstName = firstName;
                profile.lastName = lastName;
                profile.address = address;
                return [4 /*yield*/, profile.save()];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(201).json(result)];
            case 4: return [2 /*return*/, res.status(400).json({ msg: "Error while Updating Profile" })];
        }
    });
}); };
exports.EditDeliveryProfile = EditDeliveryProfile;
/* ------------------- Delivery Notification --------------------- */
var UpdateDeliveryUserStatus = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deliveryUser, _a, lat, lng, profile, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                deliveryUser = req.user;
                if (!deliveryUser) return [3 /*break*/, 3];
                _a = req.body, lat = _a.lat, lng = _a.lng;
                return [4 /*yield*/, models_1.DeliveryUser.findById(deliveryUser._id)];
            case 1:
                profile = _b.sent();
                if (!profile) return [3 /*break*/, 3];
                if (lat && lng) {
                    profile.lat = lat;
                    profile.lng = lng;
                }
                profile.isAvailable = !profile.isAvailable;
                return [4 /*yield*/, profile.save()];
            case 2:
                result = _b.sent();
                return [2 /*return*/, res.status(201).json(result)];
            case 3: return [2 /*return*/, res.status(400).json({ msg: "Error while Updating Profile" })];
        }
    });
}); };
exports.UpdateDeliveryUserStatus = UpdateDeliveryUserStatus;
//# sourceMappingURL=DeliveryController.js.map