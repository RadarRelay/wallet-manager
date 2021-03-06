"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var types_1 = require("./types");
var Store = /** @class */ (function () {
    function Store() {
    }
    /**
     * Check for any storage support
     */
    Store.isStorageSupported = function () {
        return Store.isFileStorageSupported() || Store.isLocalStorageSupported();
    };
    /**
     * Check if local storage is supported
     *
     */
    Store.isLocalStorageSupported = function () {
        if (typeof localStorage === 'undefined') {
            return false;
        }
        var lsSupportTest = 'lsSupportTest';
        try {
            localStorage.setItem(lsSupportTest, lsSupportTest);
            localStorage.removeItem(lsSupportTest);
            return true;
        }
        catch (err) {
            return false;
        }
    };
    /**
     * Check if file storage is supported
     */
    Store.isFileStorageSupported = function () {
        if (typeof fs.writeFileSync === 'undefined')
            return false;
        try {
            fs.writeFileSync('.fsSupportTest', 'test');
            fs.unlinkSync('.fsSupportTest');
            return true;
        }
        catch (err) {
            return false;
        }
    };
    /**
     * Save the encrypted wallet in local storage
     *
     * @param {Wallet} wallet The wallet to save
     * @param {string} [keyName='s-wallet'] The key identifier
     */
    Store.saveWallet = function (wallet, keyName) {
        if (keyName === void 0) { keyName = 's-wallet'; }
        if (Store.isLocalStorageSupported()) {
            localStorage.setItem(keyName, wallet.serialize());
        }
        else if (Store.isFileStorageSupported) {
            fs.writeFileSync('.' + keyName, wallet.serialize());
        }
        else {
            return false;
        }
        return true;
    };
    /**
     * Load the encrypted wallet from local storage
     *
     * @param {string} [keyName='s-wallet']  The key identifier
     */
    Store.loadWallet = function (keyName) {
        if (keyName === void 0) { keyName = 's-wallet'; }
        var serializedKeystore = null;
        if (Store.isLocalStorageSupported()) {
            serializedKeystore = localStorage.getItem(keyName);
        }
        else if (Store.isFileStorageSupported()) {
            try {
                serializedKeystore = fs.readFileSync('.' + keyName).toString();
            }
            catch (err) {
                throw new Error(types_1.WalletError.NoWalletFound);
            }
        }
        if (!serializedKeystore) {
            throw new Error(types_1.WalletError.NoWalletFound);
        }
        return serializedKeystore;
    };
    return Store;
}());
exports.Store = Store;
