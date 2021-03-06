"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WalletError;
(function (WalletError) {
    WalletError["StorageDisabled"] = "STORAGE_DISABLED";
    WalletError["NoWalletFound"] = "NO_WALLET_FOUND";
    WalletError["InvalidSeed"] = "INVALID_SEED";
    WalletError["InvalidPassword"] = "INVALID_PASSWORD";
})(WalletError = exports.WalletError || (exports.WalletError = {}));
var SigningError;
(function (SigningError) {
    SigningError["UserDeclined"] = "USER_DECLINED";
})(SigningError = exports.SigningError || (exports.SigningError = {}));
var WalletType;
(function (WalletType) {
    WalletType[WalletType["LightWallet"] = 0] = "LightWallet";
})(WalletType = exports.WalletType || (exports.WalletType = {}));
var NonceSubproviderErrors;
(function (NonceSubproviderErrors) {
    NonceSubproviderErrors["EmptyParametersFound"] = "EMPTY_PARAMETERS_FOUND";
    NonceSubproviderErrors["CannotDetermineAddressFromPayload"] = "CANNOT_DETERMINE_ADDRESS_FROM_PAYLOAD";
})(NonceSubproviderErrors = exports.NonceSubproviderErrors || (exports.NonceSubproviderErrors = {}));
var InfuraNetwork;
(function (InfuraNetwork) {
    InfuraNetwork["Mainnet"] = "mainnet";
    InfuraNetwork["Kovan"] = "kovan";
    InfuraNetwork["Rinkeby"] = "rinkeby";
    InfuraNetwork["Ropsten"] = "ropsten";
})(InfuraNetwork = exports.InfuraNetwork || (exports.InfuraNetwork = {}));
