"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lightwallet = require("eth-lightwallet");
const _ = require("lodash");
const types_1 = require("../types");
const constants_1 = require("../constants");
const CoreWallet_1 = require("../wallets/CoreWallet");
const CoreBase_1 = require("../shared/CoreBase");
class CoreManager extends CoreBase_1.CoreBase {
    /**
     * Creates a new core wallet and saves it in local storage
     *
     * @param options CoreWallet initialization options
     */
    createWalletAsync(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const filledOptions = this.populateMissingOptions(options);
            this.throwOnError(types_1.WalletError.LocalStorageDisabled);
            this.validateSeedPhraseOrThrow(options.seedPhrase);
            const keystore = yield this.initializeKeystoreAsync(filledOptions);
            const pwDerivedKey = yield this.deriveKeyFromPasswordAsync(keystore, options.password);
            keystore.generateNewAddress(pwDerivedKey, 1);
            const coreWallet = new CoreWallet_1.CoreWallet(keystore, lightwallet.signing, pwDerivedKey);
            this.store.saveCoreWallet(coreWallet);
            return coreWallet;
        });
    }
    /**
     * Save the wallet
     *
     */
    saveWallet(wallet) {
        if (wallet)
            this.store.saveCoreWallet(wallet);
    }
    /**
     * Loads a wallet from local storage
     *
     * @param password The plaintext password
     */
    loadWalletAsync(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const keystore = this.store.loadCoreWallet();
            if (!keystore) {
                throw new Error(types_1.WalletError.NoWalletFound);
            }
            const pwDerivedKey = yield this.deriveKeyFromPasswordAsync(keystore, password);
            this.validatePwDerivedKeyOrThrow(pwDerivedKey, keystore);
            return new CoreWallet_1.CoreWallet(keystore, lightwallet.signing, pwDerivedKey);
        });
    }
    /**
     * Initializes a new eth-lightwallet keystore
     *
     * @param options CoreWallet initialization options
     */
    initializeKeystoreAsync(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                // Create CoreWallet
                lightwallet.keystore.createVault(options, (err, keystore) => {
                    resolve(keystore);
                });
            });
        });
    }
    /**
     * Populate the missing wallet options
     *
     * @param options CoreWallet initialization options
     */
    populateMissingOptions(options) {
        if (_.isUndefined(options.hdPathString)) {
            options.hdPathString = constants_1.DEFAULT_DERIVATION_PATH;
        }
        if (_.isUndefined(options.seedPhrase)) {
            options.seedPhrase = lightwallet.keystore.generateRandomSeed();
        }
        return options;
    }
    /**
     * Throw the appropriate exception on error
     *
     * @param errors An array of possible WalletErrors
     */
    throwOnError(...errors) {
        for (let i = 0; i < errors.length; i++) {
            switch (errors[i]) {
                case types_1.WalletError.LocalStorageDisabled:
                    if (!this.store.isLocalStorageSupported())
                        throw new Error(types_1.WalletError.LocalStorageDisabled);
                    break;
            }
        }
    }
    /**
     * Validate the seed or throw an InvalidSeed exception
     *
     * @param seed The seed to validate
     */
    validateSeedPhraseOrThrow(seed) {
        const valid = lightwallet.keystore.isSeedValid(seed);
        if (!valid) {
            throw new Error(types_1.WalletError.InvalidSeed);
        }
    }
}
exports.CoreManager = CoreManager;
