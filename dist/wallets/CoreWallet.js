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
const CoreSigner_1 = require("../signers/CoreSigner");
const types_1 = require("../types");
const CoreBase_1 = require("../shared/CoreBase");
class CoreWallet extends CoreBase_1.CoreBase {
    constructor(keystore, signing, pwDerivedKey) {
        super();
        this._keystore = keystore;
        this._signing = signing;
        this._pwDerivedKey = pwDerivedKey;
        this.type = types_1.WalletType.Core;
        this.signer = new CoreSigner_1.CoreSigner(keystore, signing, pwDerivedKey);
    }
    /**
     * Adds one or more addresses to the wallet
     *
     */
    addNewAddresses(numberOfAddresses = 1) {
        this._keystore.generateNewAddress(this._pwDerivedKey, numberOfAddresses);
        this.store.saveCoreWallet(this);
    }
    /**
     * Gets all the addresses from the wallet
     *
     */
    getAddresses() {
        const accounts = this._keystore.getAddresses();
        return accounts;
    }
    /**
     * Serialize the wallet keystore
     *
     */
    serialize() {
        return this._keystore.serialize();
    }
    /**
     * Exports the wallet's seed phrase
     *
     */
    exportSeedPhraseAsync(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pwDerivedKey = yield this.deriveKeyFromPasswordAsync(this._keystore, password);
            this.validatePwDerivedKeyOrThrow(pwDerivedKey, this._keystore);
            return this._keystore.getSeed(pwDerivedKey);
        });
    }
    /**
     * Exports the private key for a single account
     *
     */
    exportAccountPrivateKeyAsync(address, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pwDerivedKey = yield this.deriveKeyFromPasswordAsync(this._keystore, password);
            this.validatePwDerivedKeyOrThrow(pwDerivedKey, this._keystore);
            return this._keystore.exportPrivateKey(address, pwDerivedKey);
        });
    }
}
exports.CoreWallet = CoreWallet;
