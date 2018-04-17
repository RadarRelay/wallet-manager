"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreManager_1 = require("./managers/CoreManager");
class WalletManager {
    constructor() {
        this.core = new CoreManager_1.CoreManager();
    }
}
exports.WalletManager = WalletManager;
